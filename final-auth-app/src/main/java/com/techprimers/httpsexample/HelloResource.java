package com.techprimers.httpsexample;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/hello")
public class HelloResource {

    private static final Logger LOG = LoggerFactory.getLogger(HelloResource.class);

    private String lastLogin = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

    private String goodRes = "{\n" +
            "   \"commands\":[\n" +
            "      {\n" +
            "         \"type\":\"com.okta.user.profile.update\",\n" +
            "         \"value\":{\n" +
            "            \"employeeNumber\":\":placeholder\"\n" +
            "         }\n" +
            "      },\n" +
            "      {\n" +
            "         \"type\":\"com.okta.user.profile.update\",\n" +
            "         \"value\":{\n" +
            "            \"managerId\":\"Neela\"\n" +
            "         }\n" +
            "      }\n" +
            "   ]\n" +
            "}";

    private String badRes = "{\n" +
            "  \"commands\": [\n" +
            "    {\n" +
            "      \"type\": \"com.okta.action.update\",\n" +
            "      \"value\": {\n" +
            "        \"registration\": \"DENY\"\n" +
            "      }\n" +
            "    }\n" +
            "  ]\n" +
            "}";

    @PostMapping("/verifyClubhouse")
    public String getSellersList(@RequestBody String requestData) {

        LOG.info("****************************************************************");
        LOG.info(requestData);
        LOG.info("****************************************************************");

        if (requestData.contains("elon")) {
            return goodRes.replace(":placeholder", lastLogin);
        }
        return badRes;
    }
}