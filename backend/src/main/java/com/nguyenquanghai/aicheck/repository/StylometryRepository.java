package com.nguyenquanghai.aicheck.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nguyenquanghai.aicheck.entity.Stylometry;
import com.nguyenquanghai.aicheck.repository.custom.StylometryRepositoryCustom;

public interface StylometryRepository extends JpaRepository<Stylometry, UUID>, StylometryRepositoryCustom {
}
