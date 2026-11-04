package com.nguyenquanghai.aicheck.dto.response.student;

import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder 
public class historyExam {
    //Xác định kì thi nào để lấy câu hỏi
    //Xác định câu trả lời đã làm
    private UUID examId;
    private UUID historyId;
    //Lịch sử bài kiểm tra đã làm của sinh viên
    //Nhận id câu trả lời để tạo lịch sử
    private String studentCode;
    private BigDecimal score;
    private String feedback;
    private String statusGrading;

}