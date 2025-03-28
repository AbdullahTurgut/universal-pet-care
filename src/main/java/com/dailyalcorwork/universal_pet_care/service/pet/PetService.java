package com.dailyalcorwork.universal_pet_care.service.pet;

import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.model.Pet;
import com.dailyalcorwork.universal_pet_care.repository.PetRepository;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PetService implements IPetService {
    private final PetRepository petRepository;

    // ---------- ALL PET LİST ----------------
    @Override
    public List<Pet> savePetForAppointment(List<Pet> pets) {
        return petRepository.saveAll(pets);
    }

    // ------------- UPDATE ----------------

    @Override
    public Pet updatePet(Long petId, Pet pet) {
        Pet existingPet = getPetById(petId);
        existingPet.setName(pet.getName());
        existingPet.setType(pet.getType());
        existingPet.setColor(pet.getColor());
        existingPet.setBreed(pet.getBreed());
        existingPet.setAge(pet.getAge());
        return petRepository.save(existingPet);
    }
    // ------------- DELETE ----------------

    @Override
    public void deletePet(Long petId) {
        petRepository.findById(petId).ifPresentOrElse(petRepository::delete, () -> {
            throw new ResourceNotFoundException(FeedBackMessage.NOT_FOUND);
        });
    }

    // ------------- GET BY ID ----------------

    @Override
    public Pet getPetById(Long petId) {
        return petRepository.findById(petId)
                .orElseThrow(() -> new ResourceNotFoundException(FeedBackMessage.NOT_FOUND));
    }
}
