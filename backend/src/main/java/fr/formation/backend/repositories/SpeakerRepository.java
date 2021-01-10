package fr.formation.backend.repositories;

import fr.formation.backend.entities.Room;
import fr.formation.backend.entities.Speaker;
import fr.formation.backend.viewdtos.SpeakerViewDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface SpeakerRepository extends JpaRepository<Speaker, Long> {

    Optional<SpeakerViewDto> findByUserUsername(String username);
    @Query("select s from Speaker s inner join s.user u where u.id = ?1")
    Speaker findSpeakerEntityByUserId(Long userId);

    boolean existsByUserUsername(String username);
}
