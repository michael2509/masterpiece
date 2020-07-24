package fr.formation.backend.repositories;

import fr.formation.backend.entities.Account;
import fr.formation.backend.viewdtos.AccountViewDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<AccountViewDto> findByUsername(String username);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
