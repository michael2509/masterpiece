package fr.formation.backend.services;

import fr.formation.backend.dtos.EventDto;
import fr.formation.backend.viewdtos.EventViewDto;
import org.springframework.data.domain.Page;

public interface EventService {

    void createEvent(EventDto eventDto);
    Page<EventViewDto> getEventListPage(int page, int size);
}
