package fr.formation.backend.repositories;

import fr.formation.backend.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByRoomCodeOrderBySendDateDesc(String roomCode);
}
