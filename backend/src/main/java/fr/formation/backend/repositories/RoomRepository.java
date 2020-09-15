package fr.formation.backend.repositories;

import fr.formation.backend.entities.Room;
import fr.formation.backend.viewdtos.RoomViewDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Page<RoomViewDto> findByHostId(Long userId, Pageable pageable);
}
