import { GetStaticProps } from "next";
import { Countdown } from "../../components/Countdown/Countdown";
import { Timer } from "../../components/Timer/TImer";

interface PageProps {
  initialCountdownValue: number;
  initialTimerValue: number;
}

export default function ExamplesStaticPage({
  initialCountdownValue,
  initialTimerValue,
}: PageProps) {
  return (
    <div>
      <h1>Static Example</h1>
      <Countdown initialValue={initialCountdownValue} />
      <Timer initialValue={initialTimerValue} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  return {
    props: {
      initialCountdownValue: 40,
      initialTimerValue: Date.now(),
    },
  };
};
