package com.nguyenquanghai.aicheck.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class history {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "historyId", nullable = false)
    private UUID historyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studentId", referencedColumnName = "studentId", nullable = false)
    private student student;

    @Column(name = "feedback", columnDefinition = "TEXT", nullable = true)
    private String feedback;

    @Column(name = "statusSubmission", length = 20, nullable = true)
    private String statusSubmission;

    @Column(name = "submissionAt", nullable = true)
    private LocalDateTime submissionAt;

    @Column(name = "score", nullable = true)
    private BigDecimal score;

    @Column(name = "gradeAt", nullable = true)
    private LocalDateTime gradeAt;

    @Column(name = "statusGrading", nullable = true, length = 20)
    private String statusGrading;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gradeBy", referencedColumnName = "teacherId", nullable = true)
    private teacher teacher;

    @Column(name = "statusJoin", nullable = false, length = 20)
    private String statusJoin;

    @Column(name = "joinAt", nullable = false)
    private LocalDateTime joinAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "examId", referencedColumnName = "examId", nullable = false)
    private exam exam;

}
