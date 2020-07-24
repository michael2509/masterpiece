package fr.formation.backend.viewdtos;

import fr.formation.backend.entities.Role;

import java.util.Set;

public interface AccountViewDto {

    Long getId();
    String getUsername();
    String getPassword();
    Set<Role> getRoles();

}
