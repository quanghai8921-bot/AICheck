package com.nguyenquanghai.aicheck.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Slf4j
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // 0. Turn on CORS (Allow Frontend to call)
        http.cors(
                new Customizer<org.springframework.security.config.annotation.web.configurers.CorsConfigurer<HttpSecurity>>() {
                    @Override
                    public void customize(
                            org.springframework.security.config.annotation.web.configurers.CorsConfigurer<HttpSecurity> cors) {
                        cors.configurationSource(corsConfigurationSource());
                    }
                });

        // 1. Turn off CSRF
        http.csrf(new Customizer<CsrfConfigurer<HttpSecurity>>() {
            @Override
            public void customize(CsrfConfigurer<HttpSecurity> csrf) {
                csrf.disable();
            }
        });

        // 2. Turn off Session (Because the system uses Token)
        http.sessionManagement(new Customizer<SessionManagementConfigurer<HttpSecurity>>() {
            @Override
            public void customize(SessionManagementConfigurer<HttpSecurity> session) {
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
            }
        });

        // 3. URL path permissions
        http.authorizeHttpRequests(auth -> auth

                // API log in without authentication
                .requestMatchers(
                        "/api/auth/**",
                        "/api/v1/auth/**",
                        "/error")
                .permitAll()

                // Swagger
                .requestMatchers(
                        "/v3/api-docs/**",
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/openapi.yaml")
                .permitAll()

                // API for Teacher
                .requestMatchers("/api/v1/teacher/**")
                .hasAnyRole("TEACHER")

                // API for Student
                .requestMatchers("/api/v1/student/**")
                .hasAnyRole("STUDENT")

                .requestMatchers("/api/v1/internal/**")
                .hasRole("INTERNAL_SERVICE")

                // API other request login
                .anyRequest().authenticated());

        // 4. Enable JWT Token check in Keycloak
        http.oauth2ResourceServer(new Customizer<OAuth2ResourceServerConfigurer<HttpSecurity>>() {
            @Override
            public void customize(OAuth2ResourceServerConfigurer<HttpSecurity> oauth2) {
                oauth2.jwt(new Customizer<OAuth2ResourceServerConfigurer<HttpSecurity>.JwtConfigurer>() {
                    @Override
                    public void customize(OAuth2ResourceServerConfigurer<HttpSecurity>.JwtConfigurer jwt) {
                        // Attach the Role extraction set in the 2nd order here
                        jwt.jwtAuthenticationConverter(jwtAuthenticationConverter());
                    }
                });
            }
        });

        return http.build();
    }

    // 2: READ ROLE FROM KEYCLOAK TOKEN
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(new Converter<Jwt, Collection<GrantedAuthority>>() {
            @Override
            @SuppressWarnings("unchecked")
            public Collection<GrantedAuthority> convert(Jwt jwt) {
                List<GrantedAuthority> authorities = new ArrayList<>();

                // Read the 'realm_access' part in the Token issued by Keycloak
                Map<String, Object> realmAccess = jwt.getClaim("realm_access");
                if (realmAccess != null && realmAccess.containsKey("roles")) {
                    List<String> roles = (List<String>) realmAccess.get("roles");

                    for (String roleName : roles) {
                        authorities.add(new SimpleGrantedAuthority("ROLE_" + roleName.toUpperCase()));
                    }
                }

                if (log.isDebugEnabled()) {
                    log.debug("JWT Decoded - Subject: {}, Username: {}, Authorities: {}",
                            jwt.getSubject(),
                            jwt.getClaimAsString("preferred_username"),
                            authorities);
                }

                return authorities;
            }
        });

        return converter;
    }

    // 3: Open CORS 
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        List<String> origins = new ArrayList<>();
        origins.add("http://localhost:3000"); // Link Frontend 
        config.setAllowedOrigins(origins);

        List<String> methods = new ArrayList<>();
        methods.add("GET");
        methods.add("POST");
        methods.add("PUT");
        methods.add("DELETE");
        methods.add("OPTIONS");
        config.setAllowedMethods(methods);

        List<String> headers = new ArrayList<>();
        headers.add("*"); 
        config.setAllowedHeaders(headers);

        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}