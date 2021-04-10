package fr.formation.backend.services;

import fr.formation.backend.config.SecurityHelper;
import fr.formation.backend.dtos.MessageDto;
import fr.formation.backend.entities.Chat;
import fr.formation.backend.entities.Guest;
import fr.formation.backend.entities.Message;
import fr.formation.backend.entities.Speaker;
import fr.formation.backend.repositories.GuestRepository;
import fr.formation.backend.repositories.MessageRepository;
import fr.formation.backend.repositories.ChatRepository;
import fr.formation.backend.repositories.SpeakerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final ChatRepository chatRepository;
    private final SpeakerRepository speakerRepository;
    private final GuestRepository guestRepository;


    public MessageServiceImpl(MessageRepository messageRepository, ChatRepository chatRepository, SpeakerRepository speakerRepository, GuestRepository guestRepository) {
        this.messageRepository = messageRepository;
        this.chatRepository = chatRepository;
        this.speakerRepository = speakerRepository;
        this.guestRepository = guestRepository;
    }

    @Override
    public List<Message> getMessages(Long chatId) {
        return messageRepository.findByChatId(chatId);
    }

    @Override
    public void postMessage(MessageDto messageDto) {

        // Convert message dto to entity
        Message message = new Message();
        message.setText(messageDto.getText());
        // Find room where to post the message
        Chat chat = chatRepository.findById(messageDto.getChatId()).get();
        message.setChat(chat);
        message.setSendDate(LocalDateTime.now());

        // Set speaker or guest (depends what type of user send the message)
        // Set guest if guestId was sent
        if (messageDto.getGuestId() != null) {
            Guest guest = guestRepository.findById(messageDto.getGuestId()).get();
            message.setGuest(guest);
        }
        // Otherwise, set speaker
        else {
            Long speakerId = SecurityHelper.getUserId();
            Speaker speaker = speakerRepository.findById(speakerId).get();
            message.setSpeaker(speaker);
        }

        // Save message to DB
        messageRepository.save(message);
    }
}
