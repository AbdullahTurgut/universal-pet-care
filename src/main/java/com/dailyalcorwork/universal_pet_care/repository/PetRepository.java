package com.dailyalcorwork.universal_pet_care.repository;

import com.dailyalcorwork.universal_pet_care.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {

    @Query("SELECT DISTINCT p.type FROM Pet p")
    List<String> getDistinctPetTypes();

    @Query("SELECT DISTINCT p.color FROM Pet p")
    List<String> getDistinctPetColors();

    @Query("SELECT DISTINCT p.breed FROM Pet p WHERE p.type= :petType")
    List<String> getDistinctPetBreedsByPetType(String petType);
}
