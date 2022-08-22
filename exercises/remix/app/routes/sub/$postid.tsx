import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction  = async ({ params: { postid } }) => {
  // something.findPost(postid)

  return json({ title: "This is the post for id: " + postid });
};

export default function PostSlug() {
  const { title } = useLoaderData();
  return (
    <main>
      <h1>Some Post {title}</h1>
    </main>
  );
}
