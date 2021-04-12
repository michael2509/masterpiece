package fr.formation.backend.repositories;

import fr.formation.backend.entities.Speaker;
import fr.formation.backend.viewdtos.SpeakerViewDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SpeakerRepository extends JpaRepository<Speaker, Long> {
    Speaker findByUsername(String username);
}
