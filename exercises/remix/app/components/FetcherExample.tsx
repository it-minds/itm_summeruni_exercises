import { Fetcher, Data } from "@it-minds/itm_summeruni_utils";
import { useState } from "react";
import { createAuthor } from "~/utils/fetcher/createAuthor";
import { getPostsTimeline } from "~/utils/fetcher/getPostsTimeline";
import { login } from "~/utils/fetcher/login";

export const FetcherExample = () => {
  const [fetcher, setFetcher] = useState<Fetcher>();

  return (
    <div>
      <button onClick={() => createAuthor("Mr Cool", "password1234")}>
        Create Author
      </button>

      <button
        onClick={async () => {
          const authClient = await login("Mr Cool", "password1234");
          setFetcher(authClient);
        }}
      >
        Log in
      </button>

      <button
        onClick={async () => {
          const timelineOne = await getPostsTimeline(20, {}, fetcher!);
          alert(JSON.stringify(timelineOne, null, 2));
        }}
      >
        get page!
      </button>
    </div>
  );
};
