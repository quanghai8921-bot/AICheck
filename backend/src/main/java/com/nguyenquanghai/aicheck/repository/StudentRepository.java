package com.nguyenquanghai.aicheck.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenquanghai.aicheck.entity.student;
import com.nguyenquanghai.aicheck.repository.custom.StudentRepositoryCustom;;

public interface StudentRepository extends JpaRepository<student, UUID>, StudentRepositoryCustom{
    Optional<student> findByStudentCode(String studentCode);
}
