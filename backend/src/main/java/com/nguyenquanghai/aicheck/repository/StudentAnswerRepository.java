package com.nguyenquanghai.aicheck.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenquanghai.aicheck.entity.studentAnswer;
import com.nguyenquanghai.aicheck.repository.custom.StudentAnswerRepositoryCustom;

public interface StudentAnswerRepository extends JpaRepository<studentAnswer, UUID>, StudentAnswerRepositoryCustom {
}