package com.example.demo.model

import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle
import java.util.*

data class BackendPresentationMessage(
    val message: String,
    val timestamp: String,
    val hash: Int,
) {
    companion object {
        private val dateTimeFormatter: DateTimeFormatter =
            DateTimeFormatter
                .ofLocalizedDateTime(FormatStyle.SHORT)
                .withLocale(Locale.forLanguageTag("no-nb"))

        fun fromKafkaMessage(kafkaMessage: KafkaMessage): BackendPresentationMessage {
            val instant = Instant.ofEpochMilli(kafkaMessage.timestamp)
            val timestamp = LocalDateTime.ofInstant(instant, ZoneId.systemDefault())

            return BackendPresentationMessage(
                message = kafkaMessage.message,
                timestamp = dateTimeFormatter.format(timestamp),
                hash = kafkaMessage.hashCode(),
            )
        }
    }
}
