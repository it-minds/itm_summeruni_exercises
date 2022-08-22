import { Outlet } from "@remix-run/react";

export default function TwoWrapper() {
  return (
    <main>
      <p>I wrap sub pages.</p>
      <Outlet />
    </main>
  );
}
