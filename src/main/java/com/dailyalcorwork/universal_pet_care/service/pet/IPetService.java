package com.dailyalcorwork.universal_pet_care.service.pet;

import com.dailyalcorwork.universal_pet_care.model.Pet;

import java.util.List;

public interface IPetService {

    List<Pet> savePetForAppointment(List<Pet> pets);

    Pet updatePet(Long petId, Pet pet);

    void deletePet(Long petId);

    Pet getPetById(Long petId);

    List<String> getPetTypes();

    List<String> getPetColors();

    List<String> getPetBreeds(String petType);
}
