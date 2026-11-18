package com.nguyenquanghai.aicheck.dto.response.teacher;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoryGradedExamResponse {
    private UUID historyId;

    private UUID examId;
    private String examTitle;

    private UUID studentId;
    private String studentCode;

    private BigDecimal score;
    private String feedback;
    private String statusGrading;
}
// History of teacher-graded tests