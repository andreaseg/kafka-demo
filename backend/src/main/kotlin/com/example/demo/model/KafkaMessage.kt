package com.example.demo.model

data class KafkaMessage(
    val message: String,
    val timestamp: Long,
)
