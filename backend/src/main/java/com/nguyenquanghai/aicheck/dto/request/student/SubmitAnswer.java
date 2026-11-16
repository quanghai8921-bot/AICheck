package com.nguyenquanghai.aicheck.dto.request.student;

import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitAnswer {
    private UUID examId; // Bài kiểm tra nào
    private UUID questionId; // Câu hỏi nào (nếu đề có nhiều câu)
    private String content; // Nội dung câu trả lời của sinh viên

}