import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <Link to="/one">My Link 1</Link>
        </li>
        <li>
          <Link to="/two">My Link 2</Link>
        </li>

        <li>
          <Link to="/data">data</Link>
        </li>

        <li>
          <Link to="/sub/error" reloadDocument>error</Link>
        </li>
        <li>
          <Link to="/sub/data-error">data error</Link>
        </li>

        <li>
          <Link to="/sub/123">A single post</Link>
        </li>

      </ul>
    </div>
  );
}
