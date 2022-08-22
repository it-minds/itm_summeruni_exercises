import { Data, Fetcher } from "@it-minds/itm_summeruni_utils";
import { createEffect, createResource, createSignal, For } from "solid-js";
import { render } from "solid-js/web";

type TimeLineData = Data<"/posts/timeline", "get">;

export const MartinsApp = () => {
  const [newPostText, setNewPostText] = createSignal("");

  console.log("This is a top level comment!");
  const [result, { refetch, mutate }] = createResource<TimeLineData>(
    async (_wasCalled, _info) => {
      const fetchClinet = Fetcher.configure({
        baseUrl: "http://localhost:8080",
        init: {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hZ251cyIsInVzZXJJZCI6MjIsImlhdCI6MTY2MTE1Njk1OCwiZXhwIjoxNjYxMjAwMTU4LCJqdGkiOiJlYmVmNjkxNi0yMDJhLTQ3ZDEtYTAyYi0zNWQxYzQ1YTY0OTAifQ.N9cDO6JXx9XNpprXJndHgLInAm6IoaDkruCDI9wsPxs",
          },
        },
      });

      const timelineQuery = fetchClinet
        .path("/posts/timeline")
        .method("get")
        .build();
      const timelineResult = await timelineQuery({ first: 20, after: "" });

      return timelineResult.data;
    }
  );

  const sendNewPost = async () => {
    const newPostTextLocal = newPostText();
    if (newPostTextLocal == "") return;

    const fetchClinet = Fetcher.configure({
      baseUrl: "http://localhost:8080",
      init: {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hZ251cyIsInVzZXJJZCI6MjIsImlhdCI6MTY2MTE1Njk1OCwiZXhwIjoxNjYxMjAwMTU4LCJqdGkiOiJlYmVmNjkxNi0yMDJhLTQ3ZDEtYTAyYi0zNWQxYzQ1YTY0OTAifQ.N9cDO6JXx9XNpprXJndHgLInAm6IoaDkruCDI9wsPxs",
        },
      },
    });

    const newPostClient = fetchClinet.path("/posts").method("post").build();

    await newPostClient({
      text: newPostTextLocal,
    });

    setNewPostText("");
  };

  //feels illegal but it isn't. #fuckitwedoingitlive #isthisbetterthansignalr
  setInterval(() => refetch(), 5000);

  return (
    <div>
      <b>New post!</b>
      <textarea
        value={newPostText()}
        onChange={(e) => setNewPostText(e.currentTarget.value)}
      ></textarea>
      <button onClick={sendNewPost}>Post that baby!</button>
      <For each={result()?.edges}>
        {(edge) => (
          <div>
            <p>
              <b>{(edge.node as any).authorId} {edge.node.id}:</b>{" "}
              <i>{new Date(edge.node.timestamp).toLocaleString()}</i>
            </p>
            <p>{edge.node.text}</p>
          </div>
        )}
      </For>
    </div>
  );
};

//@ts-ignore
render(() => <MartinsApp />, document.getElementById("app"));
