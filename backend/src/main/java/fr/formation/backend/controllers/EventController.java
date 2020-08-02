package fr.formation.backend.controllers;

import fr.formation.backend.dtos.EventDto;
import fr.formation.backend.services.EventService;
import fr.formation.backend.viewdtos.EventViewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    protected void createEvent(@Valid @RequestBody EventDto eventDto) {
        eventService.createEvent(eventDto);
    }

    @GetMapping()
    protected Page<EventViewDto> getEventListPage(@RequestParam("page") int page, @RequestParam("size") int size) {
        return eventService.getEventListPage(page, size);
    }
}
