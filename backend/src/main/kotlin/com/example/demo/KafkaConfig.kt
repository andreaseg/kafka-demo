package com.example.demo

import com.example.demo.model.KafkaMessage
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.common.serialization.StringDeserializer
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.annotation.EnableKafka
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory
import org.springframework.kafka.core.ConsumerFactory
import org.springframework.kafka.core.DefaultKafkaConsumerFactory

@EnableKafka
@Configuration
@ConfigurationPropertiesScan(basePackageClasses = [KafkaConfigProps::class])
class KafkaConfig(
    val configProps: KafkaConfigProps,
) {
    @Bean
    fun consumerFactory(): ConsumerFactory<String, KafkaMessage> {
        val cfg =
            mapOf(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG to configProps.bootstrapServers,
                ConsumerConfig.GROUP_ID_CONFIG to configProps.groupId,
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG to configProps.autoOffsetReset,
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG to StringDeserializer::class.java,
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG to MessageDeserializer::class.java,
            )

        return DefaultKafkaConsumerFactory(cfg)
    }

    @Bean
    fun kafkaListenerContainerFactory(): ConcurrentKafkaListenerContainerFactory<String, KafkaMessage> {
        val factory =
            ConcurrentKafkaListenerContainerFactory<String, KafkaMessage>()
        factory.consumerFactory = consumerFactory()
        return factory
    }
}
