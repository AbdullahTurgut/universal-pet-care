package com.dailyalcorwork.universal_pet_care.service.role;

import com.dailyalcorwork.universal_pet_care.model.Role;

import java.util.Collection;
import java.util.List;

public class RoleService implements IRoleService {
    @Override
    public List<Role> getAllRoles() {
        return List.of();
    }

    @Override
    public Role getRoleById(Long id) {
        return null;
    }

    @Override
    public Role getRoleByName(String roleName) {
        return null;
    }

    @Override
    public void saveRole(Role role) {

    }

    @Override
    public Collection<Role> setUserRoles(List<String> roles) {
        return List.of();
    }
}
