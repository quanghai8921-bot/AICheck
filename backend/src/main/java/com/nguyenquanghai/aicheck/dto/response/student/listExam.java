package com.nguyenquanghai.aicheck.dto.response.student;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class listExam {
    
    private UUID examId; //Hỗ trợ cho việc xác định passcode của kì thi
    private String title;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private String type;
    private String subjectCode;
    private String status;

}
