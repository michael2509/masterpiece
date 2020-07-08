package fr.formation.backend.repositories;

import fr.formation.backend.entities.EventCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventCodeRepository extends JpaRepository<EventCode, Long> {
}
