package fr.formation.backend.controllers;

import fr.formation.backend.dtos.EventDto;
import fr.formation.backend.services.EventService;
import fr.formation.backend.viewdtos.EventViewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @GetMapping("/account/{accountId}")
    protected Page<EventViewDto> getEventListPageByAccountId(@PathVariable("accountId") Long accountId, @RequestParam("page") int page, @RequestParam("size") int size) {
        return eventService.getEventListPageByAccountId(accountId, page, size);
    }
}
