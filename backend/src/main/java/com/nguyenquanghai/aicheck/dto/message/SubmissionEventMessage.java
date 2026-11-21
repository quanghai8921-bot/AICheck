package com.nguyenquanghai.aicheck.dto.message;

import java.time.LocalDateTime;
import java.util.UUID;

import com.nguyenquanghai.aicheck.dto.response.student.PreviousStylometryResponse;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubmissionEventMessage {
    private UUID answerId;
    private UUID studentId;
    private UUID examId;
    private UUID questionId;
    private String content;
    private Integer wordCount;
    private LocalDateTime submittedAt;
    private boolean isFirstSubmission;
    private PreviousStylometryResponse previousStylometry;
}
