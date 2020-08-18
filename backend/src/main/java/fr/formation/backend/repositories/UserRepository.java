package fr.formation.backend.repositories;

import fr.formation.backend.entities.Room;
import fr.formation.backend.entities.User;
import fr.formation.backend.viewdtos.UserViewDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<UserViewDto> findByUsername(String username);
    List<User> findAllByUsernameIn(List<String> usernameList);

    boolean existsByUsername(String username);
}
