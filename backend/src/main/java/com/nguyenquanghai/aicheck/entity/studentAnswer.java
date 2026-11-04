package com.nguyenquanghai.aicheck.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "studentAnswer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class studentAnswer {
    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "historyId", referencedColumnName = "historyId", nullable = false)
    private history history;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "wordCount", nullable = false)
    private Integer wordCount;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reportId", referencedColumnName = "reportId", nullable = true, unique = true)
    private reportAI reportAI;

}
