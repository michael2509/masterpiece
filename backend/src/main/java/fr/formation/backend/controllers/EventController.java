package fr.formation.backend.controllers;

import fr.formation.backend.dtos.AccountDto;
import fr.formation.backend.dtos.EventDto;
import fr.formation.backend.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    protected void createEvent(@Valid @RequestBody EventDto eventDto) {
        eventService.createEvent(eventDto);
    }
}
