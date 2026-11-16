package com.nguyenquanghai.aicheck.repository.custom;

import java.util.UUID;

import com.nguyenquanghai.aicheck.dto.response.student.studentMajor;

public interface StudentRepositoryCustom {
    //Sinh viên đó học ngành gì
    studentMajor studentMajor(UUID studentId);
}
