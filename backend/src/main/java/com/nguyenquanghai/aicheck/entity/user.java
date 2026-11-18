package com.nguyenquanghai.aicheck.entity;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "User")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "userId", nullable = false)
    private UUID userId;

    @Column(name = "fullName", nullable = false, columnDefinition = "TEXT")
    private String fullName;

    @Column(name = "dateOfBirth", nullable = false)
    private LocalDateTime dateOfBirth;

    @Column(name = "phoneNumber", nullable = false, length = 10)
    private String phoneNumber;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "sex", nullable = false, length = 10)
    private String sex;

    @Column(name = "identificationCard", nullable = false, length = 12)
    private String identificationCard;

    @Column(name = "address", nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "createdAt", nullable = false)
    private LocalDateTime createdAt;

}
