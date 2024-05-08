package com.example.demo

import com.example.demo.model.BackendPresentationMessage
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class DemoWebController(
    val database: Database,
) {
    private fun loadFile(file: String): String =
        DemoWebController::class.java.getResource("/$file")
            ?.readText(Charsets.UTF_8)
            ?: error("Missing resource $file")

    private val index: String by lazy { loadFile("index.html") }
    private val style: String by lazy { loadFile("style.css") }
    private val script: String by lazy { loadFile("script.js") }

    @GetMapping("/", produces = [MediaType.TEXT_HTML_VALUE])
    fun root(): String = index

    @GetMapping("/script.js", produces = ["text/javascript"])
    fun script(): String = script

    @GetMapping("/style.css", produces = ["text/css"])
    fun style(): String = style

    @GetMapping("/messages")
    fun messages(): List<BackendPresentationMessage> =
        database.readAll()
            .map { BackendPresentationMessage.fromKafkaMessage(it) }
}
