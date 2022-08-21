import { GetStaticProps } from "next";
import { Countdown } from "../../components/Countdown/Countdown";
import { Timer } from "../../components/Timer/TImer";

interface PageProps {
  initialCountdownValue: number;
  initialTimerValue: number;
}

export default function ExamplesStaticIncrementalPage({
  initialCountdownValue,
  initialTimerValue,
}: PageProps) {
  return (
    <div>
      <h1>Static Incremental Example</h1>
      <Countdown initialValue={initialCountdownValue} />
      <Timer initialValue={initialTimerValue} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      initialCountdownValue: 40,
      initialTimerValue: Date.now(),
    },
    revalidate: 15,
  };
};
