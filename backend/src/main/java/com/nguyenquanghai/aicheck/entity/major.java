package com.nguyenquanghai.aicheck.entity;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "major")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class major {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "majorId", nullable = false)
    private UUID majorId;

    @Column(name = "majorCode", nullable = false, length = 10)
    private String majorCode;

    @Column(name = "majorName", nullable = false, columnDefinition = "TEXT")
    private String majorName;

    @Builder.Default
    @ManyToMany
    @JoinTable(name = "subjectMajor", joinColumns = @JoinColumn(name = "majorId"), inverseJoinColumns = @JoinColumn(name = "subjectId"))
    private Set<subject> subject = new HashSet<>();
}
