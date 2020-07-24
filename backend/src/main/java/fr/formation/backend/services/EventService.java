package fr.formation.backend.services;

import fr.formation.backend.dtos.EventDto;
import fr.formation.backend.viewdtos.EventViewDto;
import org.springframework.data.domain.Page;

public interface EventService {

    void createEvent(Long accountId, EventDto eventDto);
    Page<EventViewDto> getEventListPageByAccountId(Long accountId, int page, int size);
}
