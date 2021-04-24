package fr.formation.backend.repositories;

import fr.formation.backend.entities.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

// Guest repository
public interface GuestRepository extends JpaRepository<Guest, Long> {
    Guest findByPseudo(String pseudo);
}
