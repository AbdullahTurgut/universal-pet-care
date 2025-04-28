package com.dailyalcorwork.universal_pet_care.service.role;

import com.dailyalcorwork.universal_pet_care.model.Role;

import java.util.Collection;
import java.util.List;

public interface IRoleService {

    List<Role> getAllRoles();

    Role getRoleById(Long id);

    Role getRoleByName(String roleName);

    void saveRole(Role role);

    Collection<Role> setUserRoles(List<String> roles);
}
