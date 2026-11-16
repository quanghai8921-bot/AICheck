package com.nguyenquanghai.aicheck.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nguyenquanghai.aicheck.entity.exam;
import com.nguyenquanghai.aicheck.repository.custom.ExamRepositoryCustom;

public interface ExamRepository extends JpaRepository<exam, UUID>, ExamRepositoryCustom {
}
