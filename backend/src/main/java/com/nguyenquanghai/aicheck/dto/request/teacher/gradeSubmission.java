package com.nguyenquanghai.aicheck.dto.request.teacher;

import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class gradeSubmission {

    private UUID historyId;
    private BigDecimal score;
    private String feedback;

}