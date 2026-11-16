package com.nguyenquanghai.aicheck.dto.response.student;

import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class listSubjectMajor {
    private UUID majorId;

    private UUID subjectId;
    private String subjectCode;
    private String subjectName;
}
