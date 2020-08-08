package fr.formation.backend.repositories;

import fr.formation.backend.entities.Meeting;
import fr.formation.backend.viewdtos.MeetingViewDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    Page<MeetingViewDto> findAllByUserId(Long userId, Pageable pageable);
}
