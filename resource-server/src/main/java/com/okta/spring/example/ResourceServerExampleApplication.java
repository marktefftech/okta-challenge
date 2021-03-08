package com.okta.spring.example;

import com.okta.spring.boot.oauth.Okta;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.AbstractOAuth2Token;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.server.resource.authentication.AbstractOAuth2TokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.apache.http.client.utils.DateUtils.parseDate;

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class ResourceServerExampleApplication {

    //private static final Logger LOG = LoggerFactorygetLogger(ResourceServerExampleApplication.class);
    private ApiEvents apiEvents;

    public static void main(String[] args) {
        SpringApplication.run(ResourceServerExampleApplication.class, args);
    }

    @Configuration
    static class OktaOAuth2WebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.authorizeRequests()
                .anyRequest().authenticated()
            .and()
                .oauth2ResourceServer().jwt(); //or .opaqueToken();

            // process CORS annotations
            http.cors();

            // force a non-empty response body for 401's to make the response more browser friendly
            Okta.configureResourceServer401ResponseBody(http);
        }
    }

    @RestController
    @CrossOrigin(origins = "http://localhost:8080")
    public class MessageOfTheDayController {

        //private final Logger LOG = LoggerFactory.getLogger(ResourceServerExampleApplication.class);
        Logger LOG = LogManager.getLogger(MessageOfTheDayController.class);
        public Map<String, Object> thisToken;

        @GetMapping("/api/userProfile")
        @PreAuthorize("hasAuthority('SCOPE_profile')")
        public <A extends AbstractOAuth2TokenAuthenticationToken<AbstractOAuth2Token>> Map<String, Object> getUserDetails(A authentication) {
            return authentication.getTokenAttributes();
        }

        /*//For JWT only
        @GetMapping("/api/userProfileJWT")
        @PreAuthorize("hasAuthority('SCOPE_profile')")
        public Map<String, Object> getUserDetails(JwtAuthenticationToken authentication) {
            this.thisToken = authentication;
            return authentication.getTokenAttributes();
        }

        //For Opaque Token only
        @GetMapping("/api/userProfileOpaque")
        @PreAuthorize("hasAuthority('SCOPE_profile')")
        public Map<String, Object> getUserDetails(BearerTokenAuthentication authentication) {
            this.thisBearer = authentication;
            return authentication.getTokenAttributes();
        }*/

        @GetMapping("/api/messages")
        @PreAuthorize("hasAuthority('SCOPE_email')")
        public Map<String, Object> messages() {
            apiEvents = new ApiEvents();


            Map<String, Object> result = new HashMap<>();
            result.put("messages", Arrays.asList(
                    new Message("$34534.64", "02-25-2021"),
                    new Message("$234.54", "02-25-2021"),
                    new Message("$234.63", "02-26-2021"),
                    new Message("$3241.33", "02-27-2021"),
                    new Message("$123.12", "02-27-2021"),
                    new Message("$6542.24", "02-28-2021"),
                    new Message("$234.53", "02-28-2021"),
                    new Message("$234.00", "03-04-2021"),
                    new Message("$234.43", "03-05-2021")
            ));

            return result;
        }
    }

    class Message {
        public String date;
        public String text;

        Message(String text, String date) {
            this.text = text; this.date = date;
        }
    }
}
