'use server'

import { KafkaClient, KeyedMessage, Producer } from "kafka-node";

let producer: Producer | undefined;

async function setupKafka(): Promise<Producer> {

    const client = new KafkaClient({
        kafkaHost: 'localhost:9092',
        requestTimeout: 3_000,
        connectTimeout: 1_000,
        connectRetryOptions: {
            maxTimeout: 5_000 / 3,
            retries: 3
        }
    });

    const readyCallback: Promise<Producer> = new Promise((resolve, reject) => {
        const producer = new Producer(client);
        producer.on('ready', () => {
            console.log("Created kafka client");
            resolve(producer);
        });
        producer.on('error', (error) => {
            let reason = `SetupKafkaError: ${error}`;
            if (error instanceof (AggregateError)) {
                error.errors.forEach((err) => {
                    reason += err;
                });
            }
            console.error(reason);
            reject(reason);
        });
    });

    return readyCallback;
}

/**
 * Hash from
 * https://stackoverflow.com/a/7616484
 */
function hash(str: string): number {
    let hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

async function _send(topic: string, key: any, record: any): Promise<void> {
    const message = JSON.stringify(record);
    const messageKey = key ? JSON.stringify(key) : hash(message).toString();

    console.log(`Send:\ntopic: ${topic}\nkey: ${messageKey}\nrecord: ${message}`)
    if (!producer) {
        producer = await setupKafka();
    }

    const payload = {
        topic: topic,
        messages: [new KeyedMessage(messageKey, message)]
    }

    const sendCallback = new Promise((resolve, reject) => {
        producer!.send([payload], (error, data) => {
            if (error) {
                const reason = `SendError: ${error}`;
                console.error(reason);
                reject(reason);
            } else {
                console.log(data);
                resolve(data);
            }
        })
    });

    await sendCallback;
}

export type SendResult = {
    error: string | null
};

export async function send(topic: string, key: any, record: any): Promise<SendResult> {
    try {
        await _send(topic, key, record);
        return { error: null }
    } catch (err) {
        return { error: `${err}` };
    }
}