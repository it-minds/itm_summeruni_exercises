import { Inject, Injectable } from "@nestjs/common";
import { CacheService } from "../cache.service";
import { EntityStatus, Tracking } from "../tracking";
import { v5 as uuidSeed, v4 as uuid } from "uuid";
import { EntityRepository } from "src/application/common/interfaces/applicationcontext.interface";
import { PostEntity } from "src/domain/post.entity";

const uuidNamespace = "fdb78606-a36e-42c3-a9c1-c49c247b6bb9";

type Entity = PostEntity;

@Injectable()
export class PostsCacheService implements EntityRepository<Entity> {
  constructor(@Inject(CacheService) private cacheService: CacheService) {}

  private readonly key = "posts";

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

    const filtered = all.filter((x) =>
      Object.entries(input).every(([key, val]) => x[key] === val)
    );

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
  private getTrack(post: Entity): Tracking<Entity> {
    const id = uuidSeed(post.id > 0 ? post.id : uuid(), uuidNamespace);

    const alreadyTracking = this.tracking.findIndex((x) => x.id == id);
    if (alreadyTracking > -1) {
      return this.tracking[alreadyTracking];
    }

    const track: Tracking<Entity> = {
      entity: post,
      id,
      status: post.id > 0 ? EntityStatus.Updated : EntityStatus.Created,
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

  delete(post: Entity) {
    const track = this.getTrack(post);
    track.status = EntityStatus.Deleted;
    this.setTrack(track);
  }

  update(post: Entity) {
    const track = this.getTrack(post);
    track.status = EntityStatus.Updated;
    this.setTrack(track);
  }

  add(post: Entity) {
    post.id = -1;
    const track = this.getTrack(post);
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
