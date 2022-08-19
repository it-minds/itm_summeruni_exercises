import { Edge, Page } from "src/application/common/pagination/page.interface";
import { PageInfo } from "src/application/common/pagination/pageinfo.model";

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
  (items: T[], first: number, after?: string): U => {
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

    let section: V[];

    if (!after) {
      section = edges.slice(0, first);
    } else {
      const skipTo = edges.findIndex((x) => x.cursor === after);
      section = edges.slice(skipTo + 1, skipTo + 1 + first);
    }

    const pageInfo = new PageInfo({
      hasNextPage: section.length === first,
      hasPreviousPage: !!after,
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
