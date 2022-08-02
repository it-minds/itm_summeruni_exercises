export interface IApplicationContext<T> {
  // getRandomNameFake(): Promise<NameFake>;
  getAll(): Promise<T[]>
  getById(id: number): Promise<T>

  queryForMany(input: Partial<T>): Promise<T[]>
  queryForFirst(input: Partial<T>): Promise<T>
  queryForOne(input: Partial<T>): Promise<T>

  delete(author: T): void;
  update(author: T): void;
  add(author: T): void;
  saveChanges(): Promise<void>
}
