import Link from "next/link";
import grid from "./grid.module.css";
import KafkaConnectedForm from "@/components/kafkaConnectedForm";

export default function Home() {

  return (
    <>
      <div className={grid.content}>
        <h2>Legg ut en melding på kafka kø</h2>
        <KafkaConnectedForm />

      </div>



    </>
  );
}
