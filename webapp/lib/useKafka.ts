import { send as sendKafka, SendResult } from "@/lib/kafkaService";
import { useState } from "react";

type KafkaType = {
    /**
     * Send a message to a Kafka topic
     * @param topic The Kafka topic to send the record to
     * @param record The message to be sent on the topic, will be serialized using JSON.stringify
     * @returns a promise that can be awaited for completion
     */
    send: (topic: string, record: any) => Promise<void>,
    /**
     * Send a message to a Kafka topic
     * @param topic The Kafka topic to send the record to
     * @param record The message to be sent on the topic, will be serialized using JSON.stringify
     * @param key Partition key for message
     * @returns a promise that can be awaited for completion
     */
    sendWithKey: (topic: string, record: any, key: any) => Promise<void>,
    /**
     * The status of the last message sent.
     */
    success: boolean | null,
    /**
     * Any error messages returned by the last message sent.
     */
    error: string | null,
    /**
     * Is true if a message has been sent, but has yet to return either success or failure.
     */
    waiting: boolean,
    /**
     * Reset the state of the last message sent
     */
    reset: () => void
}

/**
 * Creates a hook for communicating with backend Kafka service
 * @returns 
 */
export default function useKafka(): KafkaType {

    const intialState = {
        success: null,
        error: null,
        waiting: false
    };
    const [{ success, error, waiting }, setStatus] = useState<{ success: boolean | null, error: string | null, waiting: boolean }>(intialState);

    const sendWithKey = async (topic: string, record: any, key: any): Promise<void> => {
        console.log(`Sent kafka message to topic '${topic}': ${JSON.stringify(record)}`);
        setStatus({
            success,
            error,
            waiting: true
        });


        const { error: errorMessage }: SendResult = (await sendKafka(topic, key, record));
        if (errorMessage) {
            console.error(`Kafka Error: ${errorMessage}`)
            setStatus({
                success: false,
                error: errorMessage,
                waiting: false
            });
        } else {
            setStatus({
                success: true,
                error: null,
                waiting: false
            });
        }


    };

    const send = (topic: string, record: any) => sendWithKey(topic, record, null);

    const reset = () => {
        setStatus(intialState);
    };

    return { send, sendWithKey, success, error, waiting, reset };
}