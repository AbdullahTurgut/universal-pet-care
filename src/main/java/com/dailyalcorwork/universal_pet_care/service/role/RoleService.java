package com.dailyalcorwork.universal_pet_care.service.role;

import com.dailyalcorwork.universal_pet_care.model.Role;
import com.dailyalcorwork.universal_pet_care.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {

    private final RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleById(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    @Override
    public Role getRoleByName(String roleName) {
        return roleRepository.findByName(roleName);
    }

    @Override
    public void saveRole(Role role) {
        roleRepository.save(role);
    }

    @Override
    public Collection<Role> setUserRoles(List<String> roles) {
        return roles
                .stream()
                .map(roleName -> roleRepository.findByName("ROLE_" + roleName)).toList();
    }


}
