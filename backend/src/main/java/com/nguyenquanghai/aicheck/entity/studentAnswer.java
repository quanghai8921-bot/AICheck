package com.nguyenquanghai.aicheck.entity;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "StudentAnswer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class StudentAnswer {
    @Id
    @Column(name = "answerId", nullable = false)
    private UUID answerId; 

    @MapsId 
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answerId", referencedColumnName = "historyId", nullable = false)
    private History history;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "wordCount", nullable = false)
    private Integer wordCount;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reportId", referencedColumnName = "reportId", nullable = true, unique = true)
    private ReportAI reportAI;

}
