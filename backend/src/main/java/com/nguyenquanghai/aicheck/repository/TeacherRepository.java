package com.nguyenquanghai.aicheck.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenquanghai.aicheck.entity.Teacher;
import com.nguyenquanghai.aicheck.repository.custom.TeacherRepositoryCustom;

public interface TeacherRepository extends JpaRepository<Teacher, UUID>, TeacherRepositoryCustom {
    Optional<Teacher> findByTeacherCode(String teacherCode);
}
