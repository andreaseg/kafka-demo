import styles from "./page.module.css";
import grid from "@/app/grid.module.css";

export default function GeekPage() {
    return <div className={grid.content}>
        <h2>Teknisk informasjon</h2>
        <p>
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

        </p>

        <h2>Videre lesing</h2>

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
}