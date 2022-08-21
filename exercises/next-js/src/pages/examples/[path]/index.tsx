import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();
  return <h1>Hello {router.query["path"]}</h1>;
}
