package com.nguyenquanghai.aicheck.dto.response.student;

import java.util.UUID;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class studentInformation {

    // Thông tin cá nhân của students
    private String studentCode;
    private String majorCode;
    private Short semester;
    private Integer startYear;
    private Integer endYear;

    // Thông tin lồng/gộp từ bảng users
    private UUID userId;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String sex;
    private String indentificationCard;
    private String address;

}