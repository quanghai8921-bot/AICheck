package com.nguyenquanghai.aicheck.dto.response.teacher;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoryGradedExam {
    private UUID historyId;

    private UUID examId;
    private String examTitle;

    private UUID studentId;
    private String studentCode;
    private String fullName;

    private BigDecimal score;
    private String feedback;
    private String statusGrading;
    private LocalDateTime gradeAt;

    private UUID answerId;
    private String content;

    private UUID reportId;
    private UUID stylometryId;
    private String vocabulary;
    private String grammar;
    private String mistake;
    private String express;
    private String perplexity;
    private String burstiness;
    private String statusFlagAI;
}
// Lịch sử các bài kiểm tra giáo viên đã chấm