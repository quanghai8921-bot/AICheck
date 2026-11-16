package com.nguyenquanghai.aicheck.entity;

import java.util.UUID;

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
    @Column(name = "answerId", nullable = false)
    private UUID answerId; // 1. Khai báo rõ ràng ID là UUID
    @MapsId // 2. Báo cho JPA biết answerId sẽ lấy giá trị từ historyId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answerId", referencedColumnName = "historyId", nullable = false)
    private history history;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "wordCount", nullable = false)
    private Integer wordCount;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reportId", referencedColumnName = "reportId", nullable = true, unique = true)
    private reportAI reportAI;

}
