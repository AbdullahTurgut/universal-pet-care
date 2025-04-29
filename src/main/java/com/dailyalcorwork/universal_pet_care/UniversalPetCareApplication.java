package com.dailyalcorwork.universal_pet_care;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class UniversalPetCareApplication {

    public static void main(String[] args) {
        SpringApplication.run(UniversalPetCareApplication.class, args);
    }

}
