package com.nguyenquanghai.aicheck.dto.response.teacher;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListExamCreatedResponse {
    private UUID examId;
    private String title;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private LocalDateTime createdAt;
    private String status;
    private String type;
    private String passcode;
}