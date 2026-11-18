package com.nguyenquanghai.aicheck.dto.response.student;

import lombok.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {
    private UUID examId;
    private UUID questionId;
    private String content;
}
