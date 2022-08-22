import { ErrorBoundaryComponent } from "@remix-run/node";

export const ErrorBoundary: ErrorBoundaryComponent  = ({ error }) => {
  console.error("Error");
  console.error(error);
  return <div>Oopsie woopsie. UwU I made a fucky wucky.</div>;
};

export default function ErrorPage() {
  
  throw new Error("");

  return <p>I am the error page... Good luck (❁´◡`❁)</p>;
}
