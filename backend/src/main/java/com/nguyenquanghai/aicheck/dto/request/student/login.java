package com.nguyenquanghai.aicheck.dto.request.student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class login {
    private String studentCode;
    private String password;
}
