package fr.formation.backend.repositories;

import fr.formation.backend.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

// Message repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatIdOrderBySendDateDesc(Long chatId);
}
