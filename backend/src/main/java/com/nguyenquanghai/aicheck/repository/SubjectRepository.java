package com.nguyenquanghai.aicheck.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nguyenquanghai.aicheck.entity.Subject;
import com.nguyenquanghai.aicheck.repository.custom.SubjectRepositoryCustom;
import java.util.Optional;


public interface SubjectRepository extends JpaRepository<Subject, UUID>, SubjectRepositoryCustom{
    Optional<Subject> findBySubjectCode(String subjectCode);
}
