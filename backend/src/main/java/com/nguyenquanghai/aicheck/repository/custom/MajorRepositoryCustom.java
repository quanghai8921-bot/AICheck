package com.nguyenquanghai.aicheck.repository.custom;

import java.util.List;
import java.util.UUID;

import com.nguyenquanghai.aicheck.dto.response.student.listSubjectMajor;

public interface MajorRepositoryCustom {
    List<listSubjectMajor> findSubjectByMajorId(UUID majorId);
}
