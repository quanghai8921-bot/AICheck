package com.nguyenquanghai.aicheck.dto.request.teacher;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherLoginRequest {
    private String teacherCode;
    private String password;
}

