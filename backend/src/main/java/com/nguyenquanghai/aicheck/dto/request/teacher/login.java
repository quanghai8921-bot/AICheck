package com.nguyenquanghai.aicheck.dto.request.teacher;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class login {

    @NotBlank(message = "Mã giáo viên không được để trống")
    private String teacherCode;

    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;
}