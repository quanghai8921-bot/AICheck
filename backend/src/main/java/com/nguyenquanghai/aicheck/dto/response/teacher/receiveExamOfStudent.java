package com.nguyenquanghai.aicheck.dto.response.teacher;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class receiveExamOfStudent {
    //Danh sách sinh viên nộp bài
    private UUID studentId;
    private String studentCode;
    private String fullName;

    private UUID historyId;
    private String statusSubmission;
    private LocalDateTime submissionAt;
    private LocalDateTime joinAt;

}

