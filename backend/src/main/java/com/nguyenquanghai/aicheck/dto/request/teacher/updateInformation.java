package com.nguyenquanghai.aicheck.dto.request.teacher;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class updateInformation {
    // Nhận id của user muốn cập nhật tài khoản
    private String fullName;
    private String email;
    private String phoneNumber;
    private String sex;
    private String indentificationCard;
    private String address;

}
