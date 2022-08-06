import { Inject, Injectable } from "@nestjs/common";
import { AuthorEntity } from "src/domain/author.entity";
import { CacheService } from "../cache.service";
import { EntityStatus, Tracking } from "../tracking";
import { v5 as uuidSeed, v4 as uuid } from "uuid";
import { EntityRepository } from "src/application/common/interfaces/applicationcontext.interface";

const uuidNamespace = "fdb78606-a36e-42c3-a9c1-c49c247b6bb9";

type Entity = AuthorEntity;

@Injectable()
export class AuthorsCacheService implements EntityRepository<Entity> {
  constructor(@Inject(CacheService) private cacheService: CacheService) {}

  private readonly key = "authors";

  async getAll(): Promise<Entity[]> {
    const cacheResult = await this.cacheService.get(this.key);

    const parsedResult: Entity[] = JSON.parse(cacheResult ?? "[]");

    return parsedResult;
  }

  async getById(id: number): Promise<Entity> {
    const all = await this.getAll();

    return all.find((x) => x.id == id);
  }

  async queryForMany(input: Partial<Entity>): Promise<Entity[]> {
    const all = await this.getAll();

    if (Object.entries(input).length > 1) {
      const [first, ...rest] = await Promise.all(
        Object.entries(input).map(([key, val]) =>
          this.queryForMany({
            [key]: val,
          })
        )
      );

      return rest.reduce<Entity[]>(
        (prev, cur) =>
          prev.filter((x) => cur.findIndex((y) => y.id === x.id) >= 0),
        first
      );
    }

    const [key, val] = Object.entries(input)[0];
    const filtered = all.filter((x) => x[key] === val);

    return filtered;
  }

  async queryForFirst(input: Partial<Entity>): Promise<Entity> {
    const filtered = await this.queryForMany(input);

    return filtered[0];
  }

  async queryForOne(input: Partial<Entity>): Promise<Entity> {
    const filtered = await this.queryForMany(input);

    if (filtered.length > 1) throw new Error("More than one entity found");

    return filtered[0];
  }

  private tracking: Tracking<Entity>[] = [];
  private getTrack(author: Entity): Tracking<Entity> {
    const id = uuidSeed(author.id > 0 ? author.id : uuid(), uuidNamespace);

    const alreadyTracking = this.tracking.findIndex((x) => x.id == id);
    if (alreadyTracking > -1) {
      return this.tracking[alreadyTracking];
    }

    const track: Tracking<Entity> = {
      entity: author,
      id,
      status: author.id > 0 ? EntityStatus.Updated : EntityStatus.Created,
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

  delete(author: Entity) {
    const track = this.getTrack(author);
    track.status = EntityStatus.Deleted;
    this.setTrack(track);
  }

  update(author: Entity) {
    const track = this.getTrack(author);
    track.status = EntityStatus.Updated;
    this.setTrack(track);
  }

  add(author: Entity) {
    author.id = -1;
    const track = this.getTrack(author);
    track.status = EntityStatus.Created;
    this.setTrack(track);
  }

  async saveChanges() {
    const all = await this.getAll();

    const errors: Tracking<Entity>[] = [];

    for (let index = 0; index < this.tracking.length; index++) {
      const track = this.tracking[index];

      const foundIndex = all.findIndex((x) => x.id == track.entity.id);

      if (track.status == EntityStatus.Deleted) {
        // if (foundIndex == -1)
        all.splice(foundIndex, 1);
      }
      if (track.status == EntityStatus.Updated) {
        if (foundIndex == -1) {
          errors.push(track);
          continue;
        }
        all[foundIndex] = Object.assign(all[foundIndex], track.entity);
      }
      if (track.status == EntityStatus.Created) {
        if (foundIndex != -1) {
          errors.push(track);
          continue;
        }
        all.push(track.entity);
      }
    }

    this.tracking = [];

    if (errors.length > 0) {
      console.error(errors);
      throw Error("One of more errors occurred");
    }

    await this.cacheService.set(this.key, JSON.stringify(all));
  }
}
