package com.nguyenquanghai.aicheck.entity;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Major")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Major {
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
    @JoinTable(name = "SubjectMajor", joinColumns = @JoinColumn(name = "majorId"), inverseJoinColumns = @JoinColumn(name = "subjectId"))
    private Set<Subject> subject = new HashSet<>();
}
