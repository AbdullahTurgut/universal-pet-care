package com.dailyalcorwork.universal_pet_care.dto;

import lombok.Data;

@Data
public class PetDto {
    private Long id;
    private String name;
    private String type;
    private String color;
    private String breed;
    private int age;

}
