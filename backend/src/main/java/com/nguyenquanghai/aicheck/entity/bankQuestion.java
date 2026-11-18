package com.nguyenquanghai.aicheck.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "BankQuestion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class BankQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "questionId", nullable = false)
    private UUID questionId;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subjectId", referencedColumnName = "subjectId", nullable = false)
    private Subject subject;

}
