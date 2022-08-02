export enum EntityStatus {
  Created,
  Deleted,
  Updated
}

export interface Tracking<T> {
  status: EntityStatus;
  id: string;
  entity: T;
}