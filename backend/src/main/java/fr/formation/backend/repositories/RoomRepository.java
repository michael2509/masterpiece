package fr.formation.backend.repositories;

import fr.formation.backend.entities.Room;
import fr.formation.backend.viewdtos.RoomViewDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Page<RoomViewDto> findBySpeakerUserIdOrderByCreationDateDesc(Long userId, Pageable pageable);
    RoomViewDto findByCode(String code);
    @Query("select r from Room r where r.code = ?1")
    Room findRoomEntityByCode(String code);
}
