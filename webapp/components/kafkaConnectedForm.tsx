'use client'
import useKafka from "@/lib/useKafka";
import { FormEvent, useEffect, useId } from "react";
import useError from "./error";

import styles from "./kafkaConnectedForm.module.css";
import Loader from "./loader";

export default function KafkaConnectedForm() {

    const messageLabelId = useId();

    const { setError } = useError();

    const { send, success, error, waiting, reset } = useKafka();

    useEffect(() => {
        if (error) {
            setError({
                header: "Noe gikk galt med Kafka",
                description: error,
                tip: "Har du husket å starte Kafka i bakgrunnen?"
            });
            reset();
        }
    }, [error, setError, reset])

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (waiting) {
            console.error("Stopper klikk pga at venter på svar");
            return;
        }

        const target = e.target as typeof e.target & {
            message: { value: string };
        };

        const message = target.message.value;

        if (!message) {
            setError({
                header: "Skjemafeil",
                description: "Meldingsfeltet kan ikke være blankt",
                tip: null
            })
            return;
        }

        const record = { message, timestamp: new Date().getTime() }
        send("test-topic", record)
    }

    return (<>

        {success
            ? <>
                <p>
                    Gratulerer, du har nå sendt en melding på kafka.
                </p>
                <button onClick={reset} className={styles.resend}>
                    Send på nytt
                </button>
            </>
            : <>

                <form onSubmit={submit} className={`${styles.form} ${waiting ? styles.inactive
                    : styles.active
                    }`}>
                    {waiting && <Loader />}
                    <label className={styles.hidden_label} htmlFor={messageLabelId}>Melding</label>
                    <input
                        type="text"
                        name="message"
                        id={messageLabelId}
                        placeholder="Melding"
                        className={styles.text}
                    />
                    <input
                        type="submit"
                        value="Send"
                        className={`${styles.submit} ${waiting ? styles.inactive_bg
                            : styles.active
                            }`}
                    />

                </form></>}

    </>


    );
}