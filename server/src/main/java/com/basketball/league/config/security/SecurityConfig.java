package com.basketball.league.config.security;

import com.basketball.league.exception.handler.AuthenticationExceptionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    @Value("${application.client-origin-url}")
    private String clientOriginUrl;
    private final AuthenticationExceptionHandler authenticationExceptionHandler;

    @Bean
    public SecurityFilterChain httpSecurity(final HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/secured/**").authenticated()
                        .anyRequest().permitAll())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(makePermissionsConverter()))
                        .authenticationEntryPoint(authenticationExceptionHandler))
                .build();
    }

    private JwtAuthenticationConverter makePermissionsConverter() {
        JwtGrantedAuthoritiesConverter jwtAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtAuthoritiesConverter.setAuthoritiesClaimName("permissions");
        jwtAuthoritiesConverter.setAuthorityPrefix("");

        JwtAuthenticationConverter jwtAuthConverter = new JwtAuthenticationConverter();
        jwtAuthConverter.setJwtGrantedAuthoritiesConverter(jwtAuthoritiesConverter);

        return jwtAuthConverter;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin(clientOriginUrl);
        configuration.addAllowedMethod("*");
        configuration.setAllowedHeaders(List.of(
                HttpHeaders.AUTHORIZATION,
                HttpHeaders.CONTENT_TYPE));
        configuration.setMaxAge(86400L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
