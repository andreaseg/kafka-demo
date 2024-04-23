import styles from "./page.module.css";
import KafkaConnectedForm from "@/components/kafkaConnectedForm";

export default function Home() {

  return (
    <main className={`${styles.main} shadow-900 `}>
      <h1 className={styles.header}>
        Kafka Demo
      </h1>
      <div className={styles.content}>
        <h2>Legg ut en melding på kafka kø</h2>
        <KafkaConnectedForm />



      </div>
      <div className={styles.spec}>
        <h2>Teknisk informasjon</h2>
        Meldingen plasseres på topic <i>test-topic</i>.
        Den sendes som utf-8 encoded json med følgende struktur.
        <div className={styles.code}>
          &#123;<br />
          &nbsp;&nbsp;"message": string,<br />
          &nbsp;&nbsp;"timestamp": number<br />
          &#125;
        </div>
        Frontend tjenesten vil forsøke å sende meldingen til <i>localhost:9092</i>, dersom
        den ikke finner noen tilhørende <i>broker</i> så vil den gi opp etter 5 sekunder.
      </div>
      <div className={styles.info}>
        <h2>Nyttige lenker</h2>
        <p>
          Oversikt over kafka-kø
          <br />
          <a href="http://localhost:9021/clusters">Kafka control center</a>
        </p>

        <p>
          Grensesnitt for backend
          <br />
          <a href="http://localhost:8080">Backend tjeneste</a>
        </p>

        <p>
          Hjemmeside til Kafka
          <br />
          <a href="https://kafka.apache.org/">kafka.apache.org</a>
        </p>

        <p>
          Morsom tegneserie om Kafka
          <br />
          <a href="http://www.gentlydownthe.stream/">Gently Down the Stream</a>
        </p>
      </div>

    </main>
  );
}
