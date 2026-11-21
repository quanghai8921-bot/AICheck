package com.nguyenquanghai.aicheck.dto.response.student;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubmitExamResponse {
    private UUID historyId; 
    private UUID examId; 
    private String statusSubmission; 
    private LocalDateTime submittedAt;
    private String message; 
}
