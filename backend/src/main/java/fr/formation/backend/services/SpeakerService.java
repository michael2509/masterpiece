package fr.formation.backend.services;

import fr.formation.backend.dtos.SpeakerDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface SpeakerService extends UserDetailsService {

    void createSpeaker(SpeakerDto speakerDto);

    UserDetails loadUserByUsername(String username);

    boolean uniqueUsername(String username);
}
