import { GetServerSideProps } from "next";
import { Countdown } from "../../components/Countdown/Countdown";
import { Timer } from "../../components/Timer/TImer";

interface PageProps {
  initialCountdownValue: number;
  initialTimerValue: number;
}

export default function ExamplesServerPage({
  initialCountdownValue,
  initialTimerValue,
}: PageProps) {
  return (
    <div>
      <h1>Server Example</h1>
      <Countdown initialValue={initialCountdownValue} />
      <Timer initialValue={initialTimerValue} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  return {
    props: {
      initialCountdownValue: 20,
      initialTimerValue: Date.now(),
    },
  };
};
