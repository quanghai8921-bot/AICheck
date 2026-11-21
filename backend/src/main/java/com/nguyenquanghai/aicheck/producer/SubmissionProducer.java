package com.nguyenquanghai.aicheck.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.nguyenquanghai.aicheck.dto.message.SubmissionEventMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubmissionProducer {

    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange.submission:aicheck.submission.exchange}")
    private String exchangeName;

    @Value("${rabbitmq.routingkey.submission:aicheck.submission.routingkey}")
    private String routingKey;

    public void sendSubmissionEvent(SubmissionEventMessage message) {
        try {
            log.info("Sending submission event to RabbitMQ for answerId: {}, studentId: {}", 
                    message.getAnswerId(), message.getStudentId());
            rabbitTemplate.convertAndSend(exchangeName, routingKey, message);
            log.info("Successfully sent submission event to RabbitMQ for answerId: {}", message.getAnswerId());
        } catch (Exception e) {
            log.error("Failed to send submission event to RabbitMQ for answerId: {}. Error: {}", 
                    message.getAnswerId(), e.getMessage(), e);
        }
    }
}
