package fr.formation.backend.services;

import fr.formation.backend.dtos.EventDto;
import fr.formation.backend.entities.Account;
import fr.formation.backend.entities.Event;
import fr.formation.backend.entities.EventCode;
import fr.formation.backend.repositories.AccountRepository;
import fr.formation.backend.repositories.EventCodeRepository;
import fr.formation.backend.repositories.EventRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventServiceImpl implements  EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private EventCodeRepository eventCodeRepository;
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public void createEvent(EventDto eventDto) {
        // Convert DTO to entity
        Event event = new Event();
        event.setName(eventDto.getName());
        event.setStartDateTime(eventDto.getStartDateTime());
        event.setEndDateTime(eventDto.getEndDateTime());

        // Add account and code
        EventCode eventCode = new EventCode();
        eventCodeRepository.save(eventCode);
        event.setCode(eventCode);

        Account account = accountRepository.findByUsername("Michael De Madet").get();
        event.setAccount(account);

        eventRepository.save(event);
    }
}
