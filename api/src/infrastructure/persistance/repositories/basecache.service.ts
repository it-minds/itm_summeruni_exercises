import { CacheService } from "../cache.service";
import { EntityStatus, Tracking } from "../tracking";
import { v5 as uuidSeed, v4 as uuid } from "uuid";
import { EntityRepository } from "src/application/common/interfaces/applicationcontext.interface";

export class BaseCacheService<
  Entity extends { id: number | string },
  U extends keyof Entity
> implements EntityRepository<Entity, U>
{
  private readonly uuidNamespace;
  constructor(
    private readonly cacheService: CacheService,
    private readonly key
  ) {
    this.uuidNamespace = uuid();
  }

  async getAll(): Promise<Entity[]> {
    const cacheResult = await this.cacheService.get(this.key);

    const parsedResult: Entity[] = JSON.parse(cacheResult ?? "[]");

    return parsedResult;
  }

  async getById(id: number): Promise<Entity> {
    const all = await this.getAll();

    return all.find((x) => x.id == id);
  }

  private async queryByAttribute(key, val) {
    const all = await this.getAll();
    const filtered = all.filter((x) => x[key] === val);
    return filtered;
  }

  async queryForMany(input: Partial<Entity>): Promise<Entity[]> {
    if (Object.entries(input).length > 1) {
      const [first, ...rest] = await Promise.all(
        Object.entries(input).map(([key, val]) =>
          this.queryByAttribute(key, val)
        )
      );

      return rest.reduce<Entity[]>(
        (prev, cur) =>
          prev.filter((x) => cur.findIndex((y) => y.id === x.id) >= 0),
        first
      );
    } else {
      const [key, val] = Object.entries(input)[0];
      return await this.queryByAttribute(key, val);
    }
  }

  async queryForFirst(input: Partial<Entity>): Promise<Entity> {
    const filtered = await this.queryForMany(input);

    return filtered[0];
  }

  async queryForOne(input: Partial<Entity>): Promise<Entity> {
    const filtered = await this.queryForMany(input);

    if (filtered.length > 1) throw new Error("More than one entity found");
    if (filtered.length < 1) throw new Error("Less than one entity found");

    return filtered[0];
  }

  private tracking: Tracking<Entity>[] = [];
  private getTrack(entity: Entity): Tracking<Entity> {
    const seed = entity.id > 0 ? entity.id : uuid();
    const id = uuidSeed(`${seed}`, this.uuidNamespace);

    const alreadyTracking = this.tracking.findIndex((x) => x.id == id);
    if (alreadyTracking > -1) {
      return this.tracking[alreadyTracking];
    }

    const track: Tracking<Entity> = {
      entity,
      id,
      status: entity.id > 0 ? EntityStatus.Updated : EntityStatus.Created,
    };

    return track;
  }
  private setTrack(track: Tracking<Entity>) {
    const alreadyTracking = this.tracking.findIndex((x) => x.id == track.id);
    if (alreadyTracking > -1) {
      return this.tracking[alreadyTracking];
    }

    this.tracking.push(track);
    return track;
  }

  delete(entity: Entity) {
    const track = this.getTrack(entity);
    track.status = EntityStatus.Deleted;
    this.setTrack(track);
    return track;
  }

  update(entity: Entity) {
    const track = this.getTrack(entity);
    track.status = EntityStatus.Updated;
    this.setTrack(track);
    return track;
  }
  
  add(entity: Entity) {
    entity.id = -1;
    const track = this.getTrack(entity);
    track.status = EntityStatus.Created;
    this.setTrack(track);
    return track;
  }
  
  async saveChanges() {
    const all = await this.getAll();

    const errors: Tracking<Entity>[] = [];

    for (let index = 0; index < this.tracking.length; index++) {
      const track = this.tracking[index];

      const foundIndex = all.findIndex((x) => x.id == track.entity.id);

      if (track.status == EntityStatus.Deleted) {
        if (foundIndex == -1) {
          errors.push(track);
          continue;
        }
        all.splice(foundIndex, 1);
        track.entity = null;
      }
      if (track.status == EntityStatus.Updated) {
        if (foundIndex == -1) {
          errors.push(track);
          continue;
        }
        all[foundIndex] = Object.assign(all[foundIndex], track.entity);
        track.entity = all[foundIndex];
      }
      if (track.status == EntityStatus.Created) {
        if (foundIndex != -1) {
          errors.push(track);
          continue;
        }
        track.entity.id = all.length + 1;
        all.push(track.entity);
      }
    }

    if (errors.length > 0) {
      console.error(errors);
      throw Error("One of more errors occurred");
    }

    const toReturn = [...this.tracking];
    this.tracking = [];
    await this.cacheService.set(this.key, JSON.stringify(all));

    return toReturn;
  }
}
