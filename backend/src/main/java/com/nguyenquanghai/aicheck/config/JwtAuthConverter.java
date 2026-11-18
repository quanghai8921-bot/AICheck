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

    @Override
    public AbstractAuthenticationToken convert(@NonNull Jwt jwt) {

        // 2. Extracting Permissions (Authorities & Roles)
        Set<GrantedAuthority> authorities = Stream.concat(
                defaultConverter.convert(jwt).stream(),
                extractRealmRoles(jwt).stream()).collect(Collectors.toSet());

        // 3. Get the user's name (Principal)
        String principalClaimName = jwt.getClaimAsString("preferred_username");
        if (principalClaimName == null) {
            principalClaimName = jwt.getClaimAsString(JwtClaimNames.SUB);
        }

        return new JwtAuthenticationToken(jwt, authorities, principalClaimName);
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