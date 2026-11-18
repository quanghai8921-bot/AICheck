package com.nguyenquanghai.aicheck.dto.response.student;

import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoryExamResponse {
    private UUID historyId;
    private UUID examId;
    private String examTitle;
    private String subjectName;
    private BigDecimal score;
    private String feedback;
    private String statusSubmission;
    private String statusGrading;

}