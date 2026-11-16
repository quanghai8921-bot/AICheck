package com.nguyenquanghai.aicheck.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nguyenquanghai.aicheck.entity.major;
import com.nguyenquanghai.aicheck.repository.custom.MajorRepositoryCustom;

public interface MajorRepository extends JpaRepository<major, UUID>, MajorRepositoryCustom{
    Optional<major> findByMajorCode(String majorCode);
}
