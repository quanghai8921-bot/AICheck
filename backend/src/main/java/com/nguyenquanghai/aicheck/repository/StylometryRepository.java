package com.nguyenquanghai.aicheck.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.nguyenquanghai.aicheck.entity.stylometry;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class StylometryRepository {

    private final EntityManager entityManager;

    @Transactional
    public stylometry create(
            String vocabulary,
            String grammar,
            String mistake,
            String express) {

        stylometry result = stylometry.builder()
                .vocabulary(requireText(vocabulary, "vocabulary"))
                .grammar(requireText(grammar, "grammar"))
                .mistake(requireText(mistake, "mistake"))
                .express(requireText(express, "express"))
                .build();

        entityManager.persist(result);
        return result;
    }

    private String requireText(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(fieldName + " không được để trống.");
        }

        return value.trim();
    }
}