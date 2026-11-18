package com.nguyenquanghai.aicheck.dto.response.student;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListExamResponse {

    private UUID examId;
    private String title;
    private String type;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private String status;
    private UUID subjectId;
    private String subjectCode;
    private String subjectName;
}
// List of tests currently open / upcoming
