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
        return messageRepository.findByChatIdOrderBySendDateDesc(chatId);
    }

    // This method convert the messageDto into entity and save it in DB
    @Override
    public void postMessage(MessageDto messageDto) {
        // Start to build message entity
        Message message = new Message();
        // Set message text
        message.setText(messageDto.getText());
        // Find chat where to post the message
        Chat chat = chatRepository.findById(messageDto.getChatId()).get();
        // Set message chat
        message.setChat(chat);
        // Set message send date
        message.setSendDate(LocalDateTime.now());
        // Check message sender type
        String senderType = messageDto.getSenderType();

        // Set message speaker or guest (depends what type of user send the message)
        if (senderType.equals("guest")) {
            Guest guest = guestRepository.findByPseudo(messageDto.getSenderName());
            message.setGuest(guest);
        }
        if (senderType.equals("speaker")) {
            Speaker speaker = speakerRepository.findByUsername(messageDto.getSenderName());
            message.setSpeaker(speaker);
        }

        // Save message to DB
        messageRepository.save(message);
    }
}
