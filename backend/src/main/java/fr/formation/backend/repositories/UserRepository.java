package fr.formation.backend.repositories;

import fr.formation.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
    String findUsernameById(Long userId);
}
