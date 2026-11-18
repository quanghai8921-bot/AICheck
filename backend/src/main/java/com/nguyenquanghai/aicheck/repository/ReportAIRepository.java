package com.nguyenquanghai.aicheck.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nguyenquanghai.aicheck.entity.ReportAI;
import com.nguyenquanghai.aicheck.repository.custom.ReportAIRepositoryCustom;

public interface ReportAIRepository extends JpaRepository<ReportAI, UUID>, ReportAIRepositoryCustom {
}
