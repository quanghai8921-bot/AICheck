package com.nguyenquanghai.aicheck.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "reportAI")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class reportAI {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "reportId", nullable = false)
    private UUID reportId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stylometryId", nullable = false, unique = true)
    private stylometry stylometry;

    @Column(name = "perplexity", nullable = false, columnDefinition = "TEXT")
    private String perplexity;

    @Column(name = "burstiness", nullable = false, columnDefinition = "TEXT")
    private String burstiness;

    @Column(name = "statusFlag", nullable = false, length = 10)
    private String statusFlag;
}
