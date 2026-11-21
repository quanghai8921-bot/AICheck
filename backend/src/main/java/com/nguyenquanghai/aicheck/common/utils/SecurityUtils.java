package com.nguyenquanghai.aicheck.common.utils;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Optional;
import java.util.UUID;

public final class SecurityUtils {
    private SecurityUtils() {}

    public static Optional<Jwt> getCurrentUserJwt() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Jwt jwt) {
            return Optional.of(jwt);
        }
        return Optional.empty();
    }

    public static String getCurrentUsername() {
        return getCurrentUserJwt()
                .map(jwt -> jwt.getClaimAsString("preferred_username"))
                .orElse("anonymous");
    }

    public static UUID getCurrentUserId() {
        return getCurrentUserJwt()
                .map(jwt -> UUID.fromString(jwt.getSubject()))
                .orElseThrow(() -> new IllegalStateException("Unauthenticated user"));
    }
}
