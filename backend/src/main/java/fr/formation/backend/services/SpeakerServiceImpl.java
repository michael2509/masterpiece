package fr.formation.backend.services;

import fr.formation.backend.config.CustomUserDetails;
import fr.formation.backend.dtos.SpeakerDto;
import fr.formation.backend.entities.Speaker;
import fr.formation.backend.repositories.SpeakerRepository;
import fr.formation.backend.viewdtos.SpeakerViewDto;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SpeakerServiceImpl implements SpeakerService {

    private final PasswordEncoder passwordEncoder;
    private final SpeakerRepository speakerRepository;

    public SpeakerServiceImpl(PasswordEncoder passwordEncoder, SpeakerRepository speakerRepository) {
        this.passwordEncoder = passwordEncoder;
        this.speakerRepository = speakerRepository;
    }

    @Override
    public void createSpeaker(SpeakerDto speakerDto) {

        // Convert DTO to entity
        ModelMapper modelMapper = new ModelMapper();
        Speaker speaker = modelMapper.map(speakerDto, Speaker.class);

        // Encode the user's password
        String password = speakerDto.getPassword();
        speaker.setPassword(passwordEncoder.encode(password));

        // Save user to database
        speakerRepository.save(speaker);
    }

    @Override
    public boolean uniqueUsername(String username) {
        return username != null && !speakerRepository.existsByUserUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        SpeakerViewDto speaker = speakerRepository.findByUserUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "no speaker found with username: " + username));
        return new CustomUserDetails(speaker);
    }
}
