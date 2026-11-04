package com.nguyenquanghai.aicheck.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.nguyenquanghai.aicheck.entity.reportAI;
import com.nguyenquanghai.aicheck.entity.stylometry;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReportAIRepository {

    private final EntityManager entityManager;

    @Transactional
    public reportAI create(
            stylometry stylometry,
            String perplexity,
            String burstiness,
            String statusFlag) {

        if (stylometry == null) {
            throw new IllegalArgumentException("stylometry không được để trống.");
        }

        reportAI report = reportAI.builder()
                .stylometry(stylometry)
                .perplexity(requireText(perplexity, "perplexity"))
                .burstiness(requireText(burstiness, "burstiness"))
                .statusFlag(requireText(statusFlag, "statusFlag"))
                .build();

        entityManager.persist(report);
        return report;
    }

    private String requireText(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(fieldName + " không được để trống.");
        }

        return value.trim();
    }
}