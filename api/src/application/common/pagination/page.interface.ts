import { PageInfo } from "./pageinfo.model";

export interface Edge<T> {
  node: T;
  cursor: string;
}

export interface Page<T> {
  totalCount: number;

  edges: Edge<T>[];

  pageInfo: PageInfo;
}
