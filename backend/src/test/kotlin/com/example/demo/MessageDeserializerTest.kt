package com.example.demo

import com.example.demo.model.KafkaMessage
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class MessageDeserializerTest {
    private val messageDeserializer = MessageDeserializer()

    @Test fun deserialize() {
        val message = "Hello World :)"
        val timestamp = 1001L

        val json =
            """
            {
                "message": "$message",
                "timestamp": $timestamp
            }
            """.trimIndent().toByteArray()

        val actual = messageDeserializer.deserialize("test-topic", json)

        val expected = KafkaMessage(message, timestamp)

        assertEquals(expected, actual)
    }
}
