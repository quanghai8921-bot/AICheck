package com.nguyenquanghai.aicheck.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.nguyenquanghai.aicheck.entity.Qrole;
import com.nguyenquanghai.aicheck.entity.Quser;
import com.nguyenquanghai.aicheck.entity.role;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RoleRepository {

    private final JPAQueryFactory queryFactory;

    private final Qrole qRole = Qrole.role;
    private final Quser qUser = Quser.user;

    public Optional<role> findById(UUID roleId) {
        if (roleId == null) {
            return Optional.empty();
        }

        return Optional.ofNullable(
                queryFactory
                        .selectFrom(qRole)
                        .where(qRole.roleId.eq(roleId))
                        .fetchOne());
    }

    public Optional<role> findByName(String roleName) {
        if (roleName == null || roleName.isBlank()) {
            return Optional.empty();
        }

        return Optional.ofNullable(
                queryFactory
                        .selectFrom(qRole)
                        .where(qRole.roleName.equalsIgnoreCase(roleName.trim()))
                        .fetchOne());
    }

    public List<role> findAll() {
        return queryFactory
                .selectFrom(qRole)
                .orderBy(qRole.roleName.asc())
                .fetch();
    }

    public boolean existsByName(String roleName, UUID excludedRoleId) {
        if (roleName == null || roleName.isBlank()) {
            return false;
        }

        var condition = qRole.roleName.equalsIgnoreCase(roleName.trim());

        if (excludedRoleId != null) {
            condition = condition.and(qRole.roleId.ne(excludedRoleId));
        }

        return queryFactory
                .selectOne()
                .from(qRole)
                .where(condition)
                .fetchFirst() != null;
    }

    public long countUsersUsingRole(UUID roleId) {
        if (roleId == null) {
            return 0L;
        }

        Long count = queryFactory
                .select(qUser.count())
                .from(qUser)
                .where(qUser.role.roleId.eq(roleId))
                .fetchOne();

        return count == null ? 0L : count;
    }

    public boolean isInUse(UUID roleId) {
        return countUsersUsingRole(roleId) > 0;
    }

    @Transactional
    public boolean updateName(UUID roleId, String roleName) {
        if (roleId == null || roleName == null || roleName.isBlank()) {
            return false;
        }

        return queryFactory
                .update(qRole)
                .set(qRole.roleName, roleName.trim().toUpperCase())
                .where(qRole.roleId.eq(roleId))
                .execute() == 1;
    }
}