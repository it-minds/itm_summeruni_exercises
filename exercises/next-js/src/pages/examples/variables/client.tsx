import { useEffect, useState } from "react";

export default function ExamplesIndexPage() {
  const [dbconfig, setDbconfig] = useState();

  useEffect(() => {
    fetch("/api/environment-variables")
      .then((res) => res.json())
      .then((dat) => {
        setDbconfig(dat);
      });
  }, []);

  return (
    <div>
      <h1>Index Example</h1>
    </div>
  );
}
