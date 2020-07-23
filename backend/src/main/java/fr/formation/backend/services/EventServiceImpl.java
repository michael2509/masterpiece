package fr.formation.backend.services;

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
        Account account = accountRepository.findById(eventDto.getAccountId()).get();
        event.setAccount(account);

        Long eventsTableSize = eventRepository.count();
        String salt = String.valueOf(eventsTableSize);
        System.out.println(salt);

        Hashids hashids = new Hashids(salt, 8);
        String code = hashids.encode(eventsTableSize).toUpperCase();
        System.out.println(code);
        event.setCode(code);

        eventRepository.save(event);
    }

    @Override
    public Page<EventViewDto> getEventListPageByAccountId(Long accountId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<EventViewDto> eventListPage = eventRepository.findAllByAccountId(accountId, pageable);
        return eventListPage;
    }
}
