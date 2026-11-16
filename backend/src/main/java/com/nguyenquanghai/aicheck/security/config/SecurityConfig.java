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

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    // THỨ TỰ 1: BỘ LỌC CHÍNH (SecurityFilterChain)
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // 0. Bật cấu hình CORS (Cho phép Frontend gọi vào)
        http.cors(
                new Customizer<org.springframework.security.config.annotation.web.configurers.CorsConfigurer<HttpSecurity>>() {
                    @Override
                    public void customize(
                            org.springframework.security.config.annotation.web.configurers.CorsConfigurer<HttpSecurity> cors) {
                        cors.configurationSource(corsConfigurationSource());
                    }
                });

        // 1. Tắt CSRF
        http.csrf(new Customizer<CsrfConfigurer<HttpSecurity>>() {
            @Override
            public void customize(CsrfConfigurer<HttpSecurity> csrf) {
                csrf.disable();
            }
        });

        // 2. Tắt Session (Vì hệ thống dùng Token, không lưu session trên server)
        http.sessionManagement(new Customizer<SessionManagementConfigurer<HttpSecurity>>() {
            @Override
            public void customize(SessionManagementConfigurer<HttpSecurity> session) {
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
            }
        });

        // 3. Phân quyền đường dẫn URL
        http.authorizeHttpRequests(auth -> auth

                // API đăng nhập không cần xác thực
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

                // API dành riêng cho Teacher
                .requestMatchers("/api/teacher/**")
                .hasAnyRole("TEACHER")

                // API dành riêng cho Student
                .requestMatchers("/api/student/**")
                .hasAnyRole("STUDENT")

                // Các API khác yêu cầu đăng nhập
                .anyRequest().authenticated());

        // 4. Bật kiểm tra Token JWT của Keycloak
        http.oauth2ResourceServer(new Customizer<OAuth2ResourceServerConfigurer<HttpSecurity>>() {
            @Override
            public void customize(OAuth2ResourceServerConfigurer<HttpSecurity> oauth2) {
                oauth2.jwt(new Customizer<OAuth2ResourceServerConfigurer<HttpSecurity>.JwtConfigurer>() {
                    @Override
                    public void customize(OAuth2ResourceServerConfigurer<HttpSecurity>.JwtConfigurer jwt) {
                        // Gắn bộ bóc tách Role ở Thứ tự 2 vào đây
                        jwt.jwtAuthenticationConverter(jwtAuthenticationConverter());
                    }
                });
            }
        });

        return http.build();
    }

    // THỨ TỰ 2: BỘ ĐỌC ROLE TỪ TOKEN KEYCLOAK
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(new Converter<Jwt, Collection<GrantedAuthority>>() {
            @Override
            @SuppressWarnings("unchecked")
            public Collection<GrantedAuthority> convert(Jwt jwt) {
                // =================================================================
                // IN THÔNG TIN JWT ĐÃ GIẢI MÃ RA CONSOLE
                // =================================================================
                System.out.println("\n================ [RESOURCE SERVER - JWT DECODED] ================");
                System.out.println("Username (preferred_username) : " + jwt.getClaimAsString("preferred_username"));
                System.out.println("Subject (Keycloak User ID)   : " + jwt.getSubject());
                System.out.println("All Claims                   : " + jwt.getClaims());
                // =================================================================

                List<GrantedAuthority> authorities = new ArrayList<>();

                // Đọc phần "realm_access" trong Token do Keycloak cấp
                Map<String, Object> realmAccess = jwt.getClaim("realm_access");
                if (realmAccess != null && realmAccess.containsKey("roles")) {
                    List<String> roles = (List<String>) realmAccess.get("roles");

                    for (String roleName : roles) {
                        authorities.add(new SimpleGrantedAuthority("ROLE_" + roleName.toUpperCase()));
                    }
                }

                System.out.println("Authorities được gán         : " + authorities);
                System.out.println("=================================================================\n");

                return authorities;
            }
        });

        return converter;
    }

    // THỨ TỰ 3: MỞ CORS (Để Frontend của bạn gọi được vào Backend)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        List<String> origins = new ArrayList<>();
        origins.add("http://localhost:3000"); // Link Frontend Next.js / React
        config.setAllowedOrigins(origins);

        List<String> methods = new ArrayList<>();
        methods.add("GET");
        methods.add("POST");
        methods.add("PUT");
        methods.add("DELETE");
        methods.add("OPTIONS");
        config.setAllowedMethods(methods);

        List<String> headers = new ArrayList<>();
        headers.add("*"); // Cho phép mọi header (bao gồm Authorization: Bearer ...)
        config.setAllowedHeaders(headers);

        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}