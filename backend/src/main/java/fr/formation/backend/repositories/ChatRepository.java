package fr.formation.backend.repositories;

import fr.formation.backend.entities.Chat;
import fr.formation.backend.viewdtos.ChatViewDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    Page<Chat> findBySpeakerIdOrderByCreationDateDesc(Long userId, Pageable pageable);
    Chat findByAccessCode(String accessCode);
    Chat findFirstByOrderByIdDesc();
}
