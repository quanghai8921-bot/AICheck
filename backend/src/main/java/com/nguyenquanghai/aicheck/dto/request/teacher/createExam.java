package com.nguyenquanghai.aicheck.dto.request.teacher;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class createExam {

    @NotBlank(message = "Tiêu đề bài thi không được để trống")
    private String title;

    @NotNull(message = "Điểm tối đa không được để trống")
    @Positive
    private BigDecimal maxScore;

    @NotNull(message = "Thời gian bắt đầu không được để trống")
    private LocalDateTime startAt;

    @NotNull(message = "Thời gian kết thúc không được để trống")
    private LocalDateTime endAt;

    @NotBlank(message = "Mã người giáo viên tạo không được để trống")
    private String createdBy;

    private LocalDateTime createdAt;

    @NotBlank(message = "Loại đề thi (Quiz, Exam, Homework) không được để trống")
    private String type;

    @NotBlank(message = "Trạng thái (Opened, Locked) không được để trống")
    private String status;

    @NotBlank(message = "Passcode không được để trống")
    @Size(max = 10)
    private String passcode;

    // Câu hỏi trong ngân hàng câu hỏi chọn vào đề thi
    private UUID questionId;

    // Môn học gắn với bài thi này
    private String subjectCode;
}