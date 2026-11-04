package com.nguyenquanghai.aicheck.dto.response.teacher;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder 
public class listBankQuestion {
    private UUID questionId;
    private String content;//Nhận id question từ bài kiểm tra đã tạo để list content
    private String subjectCode;
    private BigDecimal score;
}