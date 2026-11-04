package com.nguyenquanghai.aicheck.dto.request.student;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class changePassword {
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}