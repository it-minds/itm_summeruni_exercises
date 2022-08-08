import { fetcher } from "./fetch-api-client";

async function test() {
  const fetcherClient = fetcher();

  fetcherClient.configure({
    baseUrl: "http://localhost:8080",
  });

  const login = fetcherClient.path("/auth/login").method("post").build();
  const token = await login({
    username: "Rosalyn",
    password: "Hobbs",
  });

  console.log(token.data);

  fetcherClient.configure({
    baseUrl: "http://localhost:8080",
    init: {
      headers: {
        Authorization: "Bearer " + token.data,
      },
    },
  });

  const fetchAuthor = fetcherClient.path("/authors/{id}").method("get").build();

  const author = await fetchAuthor({
    id: 1,
  });
  console.log(author.data);

  const postReply = fetcherClient
    .path("/posts/{id}/replies")
    .method("post")
    .build();
  const reply = await postReply({
    id: 1,
    text: "This is a reply!",
  });
  console.log(reply.data);
}
test();
