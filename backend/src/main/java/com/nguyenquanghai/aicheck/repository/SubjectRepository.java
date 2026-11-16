package com.nguyenquanghai.aicheck.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nguyenquanghai.aicheck.entity.subject;
import com.nguyenquanghai.aicheck.repository.custom.SubjectRepositoryCustom;
import java.util.Optional;


public interface SubjectRepository extends JpaRepository<subject, UUID>, SubjectRepositoryCustom{
    Optional<subject> findBySubjectCode(String subjectCode);
}
