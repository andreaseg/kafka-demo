package com.example.demo

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.bind.ConstructorBinding
import org.springframework.boot.context.properties.bind.Name

@ConfigurationProperties(prefix = "kafka")
class KafkaConfigProps
    @ConstructorBinding
    constructor(
        @Name("bootstrap.servers") val bootstrapServers: String,
        @Name("group.id") val groupId: String,
        @Name("auto.offset.reset") val autoOffsetReset: String,
    )
