package fr.formation.backend.repositories;

import fr.formation.backend.entities.Chat;
import fr.formation.backend.viewdtos.ChatViewDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
//    Page<RoomViewDto> findBySpeakerUserIdOrderByCreationDateDesc(Long userId, Pageable pageable);
//    RoomViewDto findByCode(String code);
//    @Query("select r from Room r where r.code = ?1")
//    Chat findRoomEntityByCode(String code);
    Page<Chat> findBySpeakerIdOrderByCreationDateDesc(Long userId, Pageable pageable);
}
