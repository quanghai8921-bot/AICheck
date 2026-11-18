package com.nguyenquanghai.aicheck.dto.request.teacher;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateExamRequest {

    private String title;
    private String subjectCode;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private LocalDateTime createdAt;
    private String type;
    private String status;
    private String passcode;
    private UUID questionId;

}