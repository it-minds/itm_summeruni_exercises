import { Fetcher, Data } from "@it-minds/itm_summeruni_utils";

export const getPostsTimeline = async (
  first: number,
  cursor: { after?: string; before?: string },
  fetcher: Fetcher
): Promise<Data<"/posts/timeline", "get">> => {
  if (cursor.after && cursor.before)
    throw Error("Cant use both kinds of cursors");

  const getTimelineClient = fetcher
    .path("/posts/timeline")
    .method("get")
    .build();

  const getTimelineResult = await getTimelineClient({
    first,
    after: cursor.after,
    before: cursor.before,
  });

  return getTimelineResult.data;
};
