import { ActionFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");

  console.log(title);

  //   return redirect("/");

  return {
    id: 1,
    title,
  };
};

export default function NewPost() {
  const formData = useActionData();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title: <input type="text" name="title" />
        </label>
      </p>
      <p className="text-right">
        <button type="submit">Create Post</button>
      </p>
    </Form>
  );
}
