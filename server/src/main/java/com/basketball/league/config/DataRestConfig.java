package com.basketball.league.config;

import com.basketball.league.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    @Value("${application.client-origin-url}")
    private String clientOriginUrl;

    private static final HttpMethod[] UNSUPPORTED_ACTIONS = {
            HttpMethod.POST,
            HttpMethod.PATCH,
            HttpMethod.DELETE,
            HttpMethod.PUT
    };

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        Class<?>[] domainTypes = {
                Player.class,
                Team.class,
                PlayerStats.class,
                Game.class,
                TableField.class
        };

        for (Class<?> domainType : domainTypes) {
            config.exposeIdsFor(domainType);
            disableHttpMethods(domainType, config, UNSUPPORTED_ACTIONS);
        }

        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(clientOriginUrl);
    }

    private void disableHttpMethods(Class<?> domainType, RepositoryRestConfiguration config, HttpMethod[] unsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(domainType)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));
    }
}
