package fr.formation.backend.repositories;

import fr.formation.backend.entities.Event;
import fr.formation.backend.viewdtos.EventViewDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EventRepository extends JpaRepository<Event, Long> {
    Page<EventViewDto> findAllByAccountId(Long accountId, Pageable pageable);
}
