package com.nguyenquanghai.aicheck.security.config;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KeycloakConfig {

    @Bean
    public Keycloak keycloakAdminClient(
            @Value("${keycloak.auth-server-url}") String serverUrl,
            @Value("${keycloak.admin.realm:master}") String adminRealm,
            @Value("${keycloak.admin.client-id:admin-cli}") String adminClientId,
            @Value("${keycloak.admin.username}") String username,
            @Value("${keycloak.admin.password}") String password) {
        return KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(adminRealm)
                .clientId(adminClientId)
                .username(username)
                .password(password)
                .build();
    }
}