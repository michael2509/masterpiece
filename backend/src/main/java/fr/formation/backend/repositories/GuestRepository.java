package fr.formation.backend.repositories;

import fr.formation.backend.entities.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest, Long> {

//    boolean existsByUserUsernameAndRoomCode(String username, String roomCode);
    Guest findByPseudo(String pseudo);
}
