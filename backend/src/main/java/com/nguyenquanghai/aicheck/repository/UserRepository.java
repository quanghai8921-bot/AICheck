package com.nguyenquanghai.aicheck.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nguyenquanghai.aicheck.entity.user;
import com.nguyenquanghai.aicheck.repository.custom.UserRepositoryCustom;

public interface UserRepository extends JpaRepository<user, UUID>, UserRepositoryCustom {
}
