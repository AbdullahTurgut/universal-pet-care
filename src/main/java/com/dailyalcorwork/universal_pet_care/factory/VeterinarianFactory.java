package com.dailyalcorwork.universal_pet_care.factory;

import com.dailyalcorwork.universal_pet_care.model.Veterinarian;
import com.dailyalcorwork.universal_pet_care.repository.VeterinarianRepository;
import com.dailyalcorwork.universal_pet_care.request.RegistrationRequest;
import com.dailyalcorwork.universal_pet_care.service.role.IRoleService;
import com.dailyalcorwork.universal_pet_care.service.user.UserAttributesMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class VeterinarianFactory {

    private final VeterinarianRepository veterinarianRepository;
    private final UserAttributesMapper userAttributesMapper;

    private final IRoleService roleService;

    public Veterinarian createVeterinarian(RegistrationRequest request) {
        Veterinarian veterinarian = new Veterinarian();
        veterinarian.setRoles(roleService.setUserRoles(Collections.singletonList("VET")));
        userAttributesMapper.setCommonAttributes(request, veterinarian);
        veterinarian.setSpecialization(request.getSpecialization());
        return veterinarianRepository.save(veterinarian);
    }
}
