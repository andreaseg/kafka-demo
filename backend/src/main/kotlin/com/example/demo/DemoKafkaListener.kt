package com.example.demo

import com.example.demo.model.KafkaMessage
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Component

@Component
class DemoKafkaListener(
    val database: Database,
) {
    @KafkaListener(
        topics = ["test-topic"],
    )
    fun listener(message: KafkaMessage) {
        database.save(message)
        println("Mottok melding ${message.message}")
    }
}
