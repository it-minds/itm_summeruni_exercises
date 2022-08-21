import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();

  const {path, deep, nested, route, page} = router.query;

  return <h1>Hello {path} {deep} {nested} {route} {page}</h1>;
}
