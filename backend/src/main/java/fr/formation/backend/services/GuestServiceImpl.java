package fr.formation.backend.services;

import fr.formation.backend.dtos.GuestDto;
import fr.formation.backend.entities.Chat;
import fr.formation.backend.entities.Guest;
import fr.formation.backend.repositories.GuestRepository;
import fr.formation.backend.repositories.ChatRepository;
import org.springframework.stereotype.Service;

// Guest service
@Service
public class GuestServiceImpl implements GuestService {

    private final GuestRepository guestRepository;
    private final ChatRepository chatRepository;

    public GuestServiceImpl(GuestRepository guestRepository, ChatRepository chatRepository) {
        this.guestRepository = guestRepository;
        this.chatRepository = chatRepository;
    }

    @Override
    public Guest createGuest(GuestDto guestDto) {

        // Convert guest dto to entity
        Guest guest = new Guest();

        // Set guest pseudo
        guest.setPseudo(guestDto.getPseudo());

        // Set guest chat
        Chat chat = chatRepository.findById(guestDto.getChatId()).get();
        guest.setChat(chat);

        // Save guest to dabatase
        Guest savedGuest = guestRepository.save(guest);

        return savedGuest;
    }
}
