package com.example.demo

import com.example.demo.model.KafkaMessage
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.common.serialization.StringDeserializer
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.function.Executable
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory
import org.springframework.kafka.core.ConsumerFactory

@SpringBootTest
class KafkaConfigTest {
    @Autowired
    lateinit var configProps: KafkaConfigProps

    @Autowired
    lateinit var consumerFactory: ConsumerFactory<String, KafkaMessage>

    @Autowired
    lateinit var containerFactory: ConcurrentKafkaListenerContainerFactory<String, KafkaMessage>

    @Test
    fun `ConsumerFactory configurationProperties`() {
        val expectedProps =
            mapOf(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG to configProps.bootstrapServers,
                ConsumerConfig.GROUP_ID_CONFIG to configProps.groupId,
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG to configProps.autoOffsetReset,
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG to StringDeserializer::class.java,
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG to MessageDeserializer::class.java,
            )
        assertNotNull(consumerFactory)
        val actualProps = consumerFactory.configurationProperties
        assertAll(
            expectedProps.map { (key, expected) ->
                Executable { assertEquals(expected, actualProps[key]) }
            },
        )
    }

    @Test
    fun `containerFactory consumerFactory`() {
        assertNotNull(containerFactory)
        assertEquals(consumerFactory, containerFactory.consumerFactory)
    }
}
