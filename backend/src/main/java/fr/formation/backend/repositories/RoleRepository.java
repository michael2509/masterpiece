package fr.formation.backend.repositories;

import fr.formation.backend.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByDefaultRoleTrue();
}
