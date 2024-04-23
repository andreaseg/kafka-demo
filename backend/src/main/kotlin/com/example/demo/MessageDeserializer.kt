package com.example.demo

import com.example.demo.model.KafkaMessage
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import org.apache.kafka.common.serialization.Deserializer

class MessageDeserializer : Deserializer<KafkaMessage> {
    private val objectMapper: ObjectMapper = ObjectMapper().registerKotlinModule()

    override fun deserialize(
        topic: String,
        data: ByteArray?,
    ): KafkaMessage? {
        if (data == null) {
            return null
        }

        return objectMapper.readValue(data, KafkaMessage::class.java)
    }
}
