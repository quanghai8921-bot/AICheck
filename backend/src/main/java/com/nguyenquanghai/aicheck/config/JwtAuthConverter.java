package com.nguyenquanghai.aicheck.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Component
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final JwtGrantedAuthoritiesConverter defaultConverter = new JwtGrantedAuthoritiesConverter();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public AbstractAuthenticationToken convert(@NonNull Jwt jwt) {
        // ==========================================
        // 1. IN THÔNG TIN JWT ĐÃ GIẢI MÃ RA CONSOLE
        // ==========================================
        printJwtInfo(jwt);

        // 2. Trích xuất quyền hạn (Authorities & Roles)
        Set<GrantedAuthority> authorities = Stream.concat(
                defaultConverter.convert(jwt).stream(),
                extractRealmRoles(jwt).stream()).collect(Collectors.toSet());

        // In các quyền sau khi Spring convert
        System.out.println(">> [SPRING SECURITY AUTHORITIES]: " + authorities);
        System.out.println("============================================================\n");

        // 3. Lấy tên user đại diện (Principal)
        String principalClaimName = jwt.getClaimAsString("preferred_username");
        if (principalClaimName == null) {
            principalClaimName = jwt.getClaimAsString(JwtClaimNames.SUB);
        }

        return new JwtAuthenticationToken(jwt, authorities, principalClaimName);
    }

    private void printJwtInfo(Jwt jwt) {
        System.out.println("\n================ [KEYCLOAK JWT DECODED] ================");
        System.out.println("Token ID (jti)   : " + jwt.getId());
        System.out.println("Subject (UUID)   : " + jwt.getSubject());
        System.out.println("Username         : " + jwt.getClaimAsString("preferred_username"));
        System.out.println("Email            : " + jwt.getClaimAsString("email"));
        System.out.println("Issuer (iss)     : " + jwt.getIssuer());
        System.out.println("Expires At (exp) : " + jwt.getExpiresAt());

        System.out.println("\n--- Toàn bộ Claims (Payload JSON) ---");
        try {
            // In đẹp định dạng JSON
            String prettyJson = objectMapper.writerWithDefaultPrettyPrinter()
                    .writeValueAsString(jwt.getClaims());
            System.out.println(prettyJson);
        } catch (Exception e) {
            System.out.println(jwt.getClaims());
        }
        System.out.println("-------------------------------------");
    }

    @SuppressWarnings("unchecked")
    private Collection<? extends GrantedAuthority> extractRealmRoles(Jwt jwt) {
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess == null || realmAccess.get("roles") == null) {
            return Collections.emptySet();
        }

        List<String> roles = (List<String>) realmAccess.get("roles");
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
                .collect(Collectors.toSet());
    }
}