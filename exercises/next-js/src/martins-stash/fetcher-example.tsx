import { Fetcher, Data } from "@it-minds/itm_summeruni_utils";
import { useEffect, useState } from "react";

type Post = Data<"/posts/timeline", "get">["edges"][number]["node"];

export default function IndexPage() {
  const [fetcher, setFetcher] = useState<Fetcher | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const run = async () => {
      const conf = {
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
      };
      const fetcher = Fetcher.configure(conf);

      const createAuthor = fetcher.path("/authors").method("post").build();
      const login = fetcher.path("/auth/login").method("post").build();

      await createAuthor({
        username: "Superuser",
        password: "asdqwe123",
      });

      const { data } = await login({
        username: "Superuser",
        password: "asdqwe123",
      });

      fetcher.configure({
        ...conf,
        init: {
          headers: {
            authorization: "Bearer " + (data as any).token,
          },
        },
      });

      setFetcher(fetcher);

      const me = fetcher.path("/auth/me").method("get").build();
      const myposts = fetcher.path("/auth/me/posts").method("get").build();
      const createPost = fetcher.path("/posts").method("post").build();

      await createPost({
        text: "This is a post",
      });

      await me({});
      const response = await myposts({
        first: 20,
        after: "",
      });

      setPosts(response.data.edges.map((x) => x.node));
    };

    run();
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      {posts.map((x) => (
        <div key={x.id} style={{ border: "1px solid grey", margin: 2}}>
          <p>{x.text}</p>
          <i>{new Date(x.timestamp).toLocaleString()}</i>
        </div>
      ))}
    </div>
  );
}
