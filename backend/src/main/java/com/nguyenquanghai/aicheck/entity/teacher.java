package com.nguyenquanghai.aicheck.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "Teacher")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Teacher {
    @Id
    @Column(name = "teacherId")
    private UUID teacherId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacherId", referencedColumnName = "userId", nullable = false)
    private User user;

    @Column(name = "teacherCode", nullable = false, length = 10, unique = true)
    private String teacherCode;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subjectId", referencedColumnName = "subjectId", nullable = false)
    private Subject subject;

    @Column(name = "experience", nullable = false)
    private Integer experience;

    @Column(name = "startYear", nullable = false)
    private Integer startAt;

    @Column(name = "endYear", nullable = true)
    private Integer endAt;

}