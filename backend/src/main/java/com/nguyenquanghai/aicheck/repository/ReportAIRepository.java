package com.nguyenquanghai.aicheck.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nguyenquanghai.aicheck.entity.reportAI;
import com.nguyenquanghai.aicheck.repository.custom.ReportAIRepositoryCustom;

public interface ReportAIRepository extends JpaRepository<reportAI, UUID>, ReportAIRepositoryCustom {
}
