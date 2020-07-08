package fr.formation.backend.services;

import fr.formation.backend.dtos.EventDto;

public interface EventService {

    void createEvent(EventDto eventDto);
}
