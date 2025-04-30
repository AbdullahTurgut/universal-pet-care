package com.dailyalcorwork.universal_pet_care.controller;

import com.dailyalcorwork.universal_pet_care.model.Role;
import com.dailyalcorwork.universal_pet_care.service.role.IRoleService;
import com.dailyalcorwork.universal_pet_care.utils.UrlMapping;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/roles")
@CrossOrigin(origins = "http://localhost:5173")
public class RoleController {
    private final IRoleService roleService;

    @GetMapping(UrlMapping.ALl_ROLES)
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping(UrlMapping.GET_ROLE_BY_ID)
    public Role getRoleById(Long roleId) {
        return roleService.getRoleById(roleId);
    }

    @GetMapping(UrlMapping.GET_ROLE_BY_NAME)
    public Role getRoleByName(String roleName) {
        return roleService.getRoleByName(roleName);
    }
}
