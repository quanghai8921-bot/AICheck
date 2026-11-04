package com.nguyenquanghai.aicheck.dto.response.teacher;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class teacherInformation {
    // Thông tin cá nhân của teachers
    //Hỗ trợ xác định code teacher muốn cập nhật nếu cần
    private String teacherCode;
    private String subjectCode;
    private String degree;
    private String experience;
    private LocalDateTime startYear;
    private LocalDateTime endYear;

    // Thông tin lồng/gộp từ bảng users
    //Hỗ trợ xác định id user muốn cập nhật nếu cần
    private UUID userId;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String sex;
    private String indentificationCard;
    private String address;
}
