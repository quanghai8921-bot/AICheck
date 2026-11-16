package com.nguyenquanghai.aicheck.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "student")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class student {
    @Id
    @Column(name = "studentId")
    private UUID studentId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studentId", referencedColumnName = "userId", nullable = false)
    private user user;

    @Column(name = "studentCode", nullable = false, length = 10, unique = true)
    private String studentCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "majorId", referencedColumnName = "majorId", nullable = false)
    private major major;

    @Column(name = "semester", nullable = false)
    private Short semester;

    @Column(name = "startYear", nullable = false)
    private Integer startAt;

    @Column(name = "endYear", nullable = false)
    private Integer endAt;

}
