import { GetServerSideProps, GetStaticProps } from "next";

export default function ExamplesIndexPage() {
  const dbconfig = {
    host: process.env.NEXT_PUBLIC_API_HOST,
    secret: process.env.NEXT_PUBLIC_API_SECRET,
  };

  return (
    <div>
      <h1>Index Example</h1>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      dbconfig: {
        host: process.env.API_HOST || null,
        secret: process.env.API_SECRET || null,
      },
    },
  };
};


// export const getServerProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       dbconfig: {
//         host: process.env.API_HOST || null,,
//         secret: process.env.API_SECRET || null,,
//       },
//     },
//   };
// };
