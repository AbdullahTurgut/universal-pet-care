package com.dailyalcorwork.universal_pet_care.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"appointment"}) // olusabilecek döngüyü kırmak icin
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    private String color;
    private String breed;
    private int age;

    // her appointmen birden fazla pete sahip olabilir. Petten de petler bir appointmente sahip olabilir.
    @ManyToOne
    private Appointment appointment;
}
