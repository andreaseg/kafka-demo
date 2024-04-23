package com.example.demo

import com.example.demo.model.BackendPresentationMessage
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class DemoWebController(
    val database: Database,
) {
    private val index: String by lazy {
        DemoWebController::class.java.getResource("/index.html")
            ?.readText(Charsets.UTF_8)
            ?: error("Missing resource index.html")
    }

    @GetMapping("/")
    fun root(): String = index

    @GetMapping("/messages")
    fun messages(): List<BackendPresentationMessage> =
        database.messageStore
            .map { BackendPresentationMessage.fromKafkaMessage(it) }
}
