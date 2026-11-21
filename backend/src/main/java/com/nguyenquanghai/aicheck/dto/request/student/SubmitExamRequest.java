package com.nguyenquanghai.aicheck.dto.request.student;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitExamRequest {
    @NotNull(message = "Question ID is required")
    private UUID questionId;

    @NotBlank(message = "Content cannot be empty")
    private String content;

    private Integer wordCount;
}
