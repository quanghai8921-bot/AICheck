package com.nguyenquanghai.aicheck.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "stylometry")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class stylometry {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "stylometryId", nullable = false)
    private UUID stylometryId;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "vocabulary", nullable = false, columnDefinition = "jsonb")
    private String vocabulary;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "grammar", nullable = false, columnDefinition = "jsonb")
    private String grammar;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "mistake", nullable = false, columnDefinition = "jsonb")
    private String mistake;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "express", nullable = false, columnDefinition = "jsonb")
    private String express;
}
