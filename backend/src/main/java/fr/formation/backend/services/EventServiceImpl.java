package fr.formation.backend.services;

import fr.formation.backend.config.SecurityHelper;
import fr.formation.backend.dtos.EventDto;
import fr.formation.backend.entities.Account;
import fr.formation.backend.entities.Event;
import fr.formation.backend.repositories.AccountRepository;
import fr.formation.backend.repositories.EventRepository;
import fr.formation.backend.viewdtos.EventViewDto;
import org.hashids.Hashids;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EventServiceImpl implements  EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void createEvent(EventDto eventDto) {
        Event event = modelMapper.map(eventDto, Event.class);

        // Add account and code
        Long accountId = SecurityHelper.getUserId();
        Account account = accountRepository.findById(accountId).get();
        event.setAccount(account);

        Long eventsTableSize = eventRepository.count();
        String salt = String.valueOf(eventsTableSize);

        Hashids hashids = new Hashids(salt, 5);
        String code = hashids.encode(eventsTableSize).toUpperCase();
        event.setCode(code);

        eventRepository.save(event);
    }

    @Override
    public Page<EventViewDto> getEventListPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Long accountId = SecurityHelper.getUserId();
        Page<EventViewDto> eventListPage = eventRepository.findAllByAccountId(accountId, pageable);
        return eventListPage;
    }
}
