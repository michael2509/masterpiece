package fr.formation.backend.repositories;

import fr.formation.backend.entities.User;
import fr.formation.backend.viewdtos.UserViewDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<UserViewDto> findByUsername(String username);

    boolean existsByUsername(String username);
}
