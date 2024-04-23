package com.example.demo

import com.example.demo.model.KafkaMessage
import org.springframework.stereotype.Component

@Component
class Database(val messageStore: MutableList<KafkaMessage> = mutableListOf())
