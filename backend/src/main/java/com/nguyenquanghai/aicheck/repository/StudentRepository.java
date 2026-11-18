package com.nguyenquanghai.aicheck.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenquanghai.aicheck.entity.Student;
import com.nguyenquanghai.aicheck.repository.custom.StudentRepositoryCustom;;

public interface StudentRepository extends JpaRepository<Student, UUID>, StudentRepositoryCustom{
    Optional<Student> findByStudentCode(String studentCode);
}
