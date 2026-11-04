package com.nguyenquanghai.aicheck.dto.request.student;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class login {
    @NotBlank(message = "Mã sinh viên không được để trống")
    private String studentCode;

    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;

}
