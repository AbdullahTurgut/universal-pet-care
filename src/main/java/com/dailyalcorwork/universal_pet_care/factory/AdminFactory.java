package com.dailyalcorwork.universal_pet_care.factory;

import com.dailyalcorwork.universal_pet_care.model.Admin;
import com.dailyalcorwork.universal_pet_care.repository.AdminRepository;
import com.dailyalcorwork.universal_pet_care.request.RegistrationRequest;
import com.dailyalcorwork.universal_pet_care.service.role.IRoleService;
import com.dailyalcorwork.universal_pet_care.service.user.UserAttributesMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AdminFactory {
    private final AdminRepository adminRepository;
    private final UserAttributesMapper userAttributesMapper;
    private final IRoleService roleService;

    public Admin createAdmin(RegistrationRequest request) {
        Admin admin = new Admin();
        admin.setRoles(roleService.setUserRoles(Collections.singletonList("ADMIN")));
        userAttributesMapper.setCommonAttributes(request, admin);
        return adminRepository.save(admin);
    }
}
