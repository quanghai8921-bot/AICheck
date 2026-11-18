package com.nguyenquanghai.aicheck.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nguyenquanghai.aicheck.repository.custom.HistoryRepositoryCustom;

import com.nguyenquanghai.aicheck.entity.History;

public interface HistoryRepository extends JpaRepository<History, UUID>, HistoryRepositoryCustom {
    Optional<History> findByStudent_StudentIdAndExam_ExamId(UUID studentId, UUID examId);
}