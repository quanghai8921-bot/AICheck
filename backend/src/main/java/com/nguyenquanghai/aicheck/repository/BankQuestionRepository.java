package com.nguyenquanghai.aicheck.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nguyenquanghai.aicheck.entity.BankQuestion;
import com.nguyenquanghai.aicheck.repository.custom.BankQuestionRepositoryCustom;

public interface BankQuestionRepository extends JpaRepository<BankQuestion, UUID>, BankQuestionRepositoryCustom {
}
