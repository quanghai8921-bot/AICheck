package com.nguyenquanghai.aicheck.dto.response.teacher;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceiveExamOfStudentResponse {
    private UUID historyId;
    private UUID studentId;
    private String studentCode;

    private String statusSubmission;
    private LocalDateTime submissionAt;
    private LocalDateTime joinAt;

    private UUID reportId;
    private String statusFlag;

}
