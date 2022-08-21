import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";
import { AppProps } from "next/app";
import Link from "next/link";

function MyApp({ Component, pageProps, __N_RSC, __N_SSG, __N_SSP }: AppProps) {
  console.log("rendering...");
  console.table({ RSC: __N_RSC, SSG: __N_SSG, SSP: __N_SSP });

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Link href={"/examples"} passHref={true}>
          <button type="button">Index</button>
        </Link>
        <Link href={"/examples/server"} passHref={true} prefetch={true}>
          <button type="button">Server</button>
        </Link>
        <Link href={"/examples/static"} passHref={true} prefetch={true}>
          <button type="button">Static</button>
        </Link>
        <Link href={"/examples/incremental"} passHref={true} prefetch={true}>
          <button type="button">Incremental</button>
        </Link>
        <Link href={"/examples/world"} passHref={true}>
          <button type="button">Path</button>
        </Link>
        <Link href={"/examples/w/o/r/l/d"} passHref={true}>
          <button type="button">Nested</button>
        </Link>
      </div>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </div>
  );
}

export default MyApp;
