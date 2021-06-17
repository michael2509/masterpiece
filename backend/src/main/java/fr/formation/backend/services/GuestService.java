package fr.formation.backend.services;

import fr.formation.backend.dtos.GuestDto;
import fr.formation.backend.entities.Guest;
import org.springframework.http.ResponseEntity;

// Interface for guest service
public interface GuestService {

    Guest createGuest(GuestDto guestDto);
}
