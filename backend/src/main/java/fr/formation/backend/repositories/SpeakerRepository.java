package fr.formation.backend.repositories;

import fr.formation.backend.entities.Speaker;
import fr.formation.backend.viewdtos.SpeakerViewDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface SpeakerRepository extends JpaRepository<Speaker, Long> {

    Optional<SpeakerViewDto> findByUserUsername(String username);

    boolean existsByUserUsername(String username);
}
