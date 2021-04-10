package fr.formation.backend.services;

import fr.formation.backend.dtos.GuestDto;
import fr.formation.backend.entities.Guest;
import org.springframework.http.ResponseEntity;

public interface GuestService {

    void createGuest(GuestDto guestDto);
}
