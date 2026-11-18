package com.nguyenquanghai.aicheck.dto.request.student;

import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitAnswerRequest {
    private UUID examId; 
    private UUID questionId; 
    private String content; 
    private Integer wordCount;

}