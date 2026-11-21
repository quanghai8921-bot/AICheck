package com.nguyenquanghai.aicheck.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class RabbitMQConfig {

    @Value("${rabbitmq.exchange.submission:aicheck.submission.exchange}")
    private String exchangeName;

    @Value("${rabbitmq.queue.submission:aicheck.submission.queue}")
    private String queueName;

    @Value("${rabbitmq.routingkey.submission:aicheck.submission.routingkey}")
    private String routingKey;

    @Bean
    public Queue submissionQueue() {
        return QueueBuilder.durable(queueName).build();
    }

    @Bean
    public DirectExchange submissionExchange() {
        return new DirectExchange(exchangeName, true, false);
    }

    @Bean
    public Binding submissionBinding(Queue submissionQueue, DirectExchange submissionExchange) {
        return BindingBuilder.bind(submissionQueue).to(submissionExchange).with(routingKey);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        return new Jackson2JsonMessageConverter(objectMapper);
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter messageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter);
        return rabbitTemplate;
    }
    
    @Bean
    public ApplicationRunner rabbitConnectionWarmUp(ConnectionFactory connectionFactory) {
        return args -> {
            try {
                connectionFactory.createConnection();
                log.info("RabbitMQ connection pool initialized and maintained successfully.");
            } catch (Exception e) {
                log.warn("Could not pre-warm RabbitMQ connection: {}. Will retry when sending messages.", e.getMessage());
            }
        };
    }
}
