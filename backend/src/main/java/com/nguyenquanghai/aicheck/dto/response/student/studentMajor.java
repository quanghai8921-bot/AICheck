package com.nguyenquanghai.aicheck.dto.response.student;

import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class studentMajor {
    private UUID studentId;
    private String studentCode;
    private UUID majorId;
    private String majorCode;
}
