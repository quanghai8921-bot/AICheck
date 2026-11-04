package com.nguyenquanghai.aicheck.dto.response.teacher;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class listExamCreated {
    private UUID examId;
    private String title;
    private BigDecimal maxScore;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private String createdBy;
    private LocalDateTime createdAt;
    private String type;
    private String passcode;
    private String subjectCode;
    //Hỗ trợ xác định id câu hỏi của kì thi đó
    private String questionId;
}