import { ErrorBoundaryComponent, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const ErrorBoundary: ErrorBoundaryComponent  = ({ error }) => {
  console.error(error);
  return <div>Oopsie woopsie. UwU I made a fucky wucky.</div>;
};

export const loader = async () => {
  throw new Error("data error")
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

export default function ErrorPage() {
  
  const { posts } = useLoaderData();
  console.log(posts);

  return <p>I am the error page... Good luck (❁´◡`❁)</p>;
}
