package com.nguyenquanghai.aicheck.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nguyenquanghai.aicheck.repository.custom.HistoryRepositoryCustom;

import com.nguyenquanghai.aicheck.entity.history;

public interface HistoryRepository extends JpaRepository<history, UUID>, HistoryRepositoryCustom {
}