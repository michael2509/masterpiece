package fr.formation.backend.controllers;

import fr.formation.backend.dtos.GuestDto;
import fr.formation.backend.entities.Guest;
import fr.formation.backend.services.GuestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/guests")
public class GuestController {

    private final GuestService guestService;

    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    @PostMapping
    protected void createGuest(@Valid @RequestBody GuestDto guestDto) {
        guestService.createGuest(guestDto);
    }
}
