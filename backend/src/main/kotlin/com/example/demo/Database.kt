package com.example.demo

import com.example.demo.model.KafkaMessage
import org.springframework.stereotype.Component

@Component
class Database {
    private val messageStore: MutableList<KafkaMessage> = mutableListOf()

    fun save(message: KafkaMessage) {
        messageStore.add(message)
    }

    fun readAll(): List<KafkaMessage> = messageStore
}
