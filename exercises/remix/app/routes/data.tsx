import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";

export const loader = async () => {
  return json({
    posts: [
      {
        title: "Martin talks too much",
      },
      {
        title: "I just love javascript",
      },
    ],
  });
};

// export const loader = async () => {
//   return json({
//     posts: await getPosts(),
//   });
// };

export default function Data() {
  const { posts } = useLoaderData();
  console.log(posts);

  return <p>I am the data page.</p>;
}
