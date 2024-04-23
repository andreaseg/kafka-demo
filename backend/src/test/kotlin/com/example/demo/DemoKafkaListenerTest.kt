package com.example.demo

import com.example.demo.model.KafkaMessage
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class DemoKafkaListenerTest {
    @Autowired
    lateinit var listener: DemoKafkaListener

    @Test
    fun kafkaListener() {
        assertDoesNotThrow { listener.listener(KafkaMessage("Hello World", 1)) }
    }
}
