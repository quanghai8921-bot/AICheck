package com.nguyenquanghai.aicheck.dto.response.teacher;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListBankQuestionResponse {
    private UUID questionId;
    private String content;
    private String subjectCode;
    private BigDecimal score;
}