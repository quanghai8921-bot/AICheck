package com.nguyenquanghai.aicheck.entity;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "subject")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class subject {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "subjectId", nullable = false)
    private UUID subjectId;

    @Column(name = "subjectCode", nullable = false, length = 10, unique = true)
    private String subjectCode;

    @Column(name = "subjectName", nullable = false, columnDefinition = "TEXT")
    private String subjectName;

}
