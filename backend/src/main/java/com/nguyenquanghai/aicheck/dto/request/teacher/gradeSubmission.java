package com.nguyenquanghai.aicheck.dto.request.teacher;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class gradeSubmission {

    private UUID historyId;

    @NotNull(message = "Điểm số không được để trống")
    private BigDecimal score;

    @NotBlank(message = "Lời nhận xét không được để trống")
    private String feedback;

    @NotBlank(message = "Trạng thái chấm điểm không được để trống")
    private String statusGrading;

    @NotNull(message = "Mã người chấm có thể null")
    private String gradeBy;

}