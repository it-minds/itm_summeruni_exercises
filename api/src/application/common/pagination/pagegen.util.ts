import { Edge, Page } from "src/application/common/pagination/page.interface";
import { PageInfo } from "src/application/common/pagination/pageinfo.model";
import { IPaginationQuery } from "./pagination.interface";

interface InstanceConstructor<T> {
  new (t: Partial<T>): T;
}

/**
 *
 * @param PageInstance
 * @param EdgeInstance
 * @param cursorCallback
 * @returns
 */
export const GenericPageGen =
  <T, U extends Page<T>, V extends Edge<T>>(
    PageInstance: InstanceConstructor<U>,
    EdgeInstance: InstanceConstructor<V>,
    cursorCallback: (t: T) => string
  ) =>
  (items: T[], paginationQuery: IPaginationQuery): U => {
    const edges = items.map((item) => {
      return new EdgeInstance(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        {
          node: item,
          cursor: cursorCallback(item),
        }
      );
    });

    console.log(paginationQuery);

    const { first = 20, after, before } = paginationQuery;

    if (after && before) {
      throw Error("Both after and before can't be used at the same time.");
    }

    let section: V[], hasNextPage: boolean, hasPreviousPage: boolean;

    if (!after && !before) {
      console.log("Paging default", 0, first)
      section = edges.slice(0, first);
      hasPreviousPage = false;
      hasNextPage = edges.length > first;
    } else if (before) {
      const lastIndex = edges.findIndex((x) => x.cursor === before);
      const firstIndex = (lastIndex - first) > 0 ? (lastIndex - first) : 0;
      console.log("Paging before", firstIndex, lastIndex)

      if (lastIndex === -1) throw Error("Cursor not found");
      
      section = edges.slice(firstIndex, lastIndex);
      hasPreviousPage = firstIndex > 0;
      hasNextPage = edges.length > lastIndex;
    } else if (after) {
      const firstIndex = edges.findIndex((x) => x.cursor === after) + 1;
      const lastIndex = (firstIndex + first) < edges.length ? (firstIndex + first) : edges.length;
      console.log("Paging after", firstIndex, lastIndex)
      
      if (firstIndex === -1) throw Error("Cursor not found");

      section = edges.slice(firstIndex, lastIndex);
      hasPreviousPage = firstIndex > 0;
      hasNextPage = edges.length > lastIndex;
    }

    const pageInfo = new PageInfo({
      hasPreviousPage,
      hasNextPage,
      startCursor: section[0]?.cursor,
      endCursor: section[section.length - 1]?.cursor,
    });

    return new PageInstance(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      {
        totalCount: edges.length,
        edges: section,
        pageInfo,
      }
    );
  };
