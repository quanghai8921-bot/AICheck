package com.nguyenquanghai.aicheck.dto.request.student;

import java.util.UUID;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class answer {
    //Nhận id câu hỏi đang làm rồi trả lời câu đó
    private UUID answerId;

    @NotBlank(message = "Nội dung bài làm không được để trống")
    private String content;

    @NotNull(message = "Số lượng từ không được để trống")
    private Integer wordCount;

}