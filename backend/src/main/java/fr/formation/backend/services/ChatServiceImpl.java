package fr.formation.backend.services;

import fr.formation.backend.config.SecurityHelper;
import fr.formation.backend.dtos.ChatDto;
import fr.formation.backend.dtos.UpdateChatDto;
import fr.formation.backend.entities.Chat;
import fr.formation.backend.entities.Speaker;
import fr.formation.backend.repositories.SpeakerRepository;
import fr.formation.backend.repositories.ChatRepository;
import fr.formation.backend.viewdtos.ChatViewDto;
import org.hashids.Hashids;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

// Chat service
@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private SpeakerRepository speakerRepository;

    // This method convert the chatDTO into Entity, then call the chatRepository to save the chat in DB
    @Override
    public void createChat(ChatDto chatDto) {
        // Start to build chat entity from chatDTO
        Chat chat = new Chat();
        // Set chat name
        chat.setName(chatDto.getName());
        // Get speaker Id from access token
        Long speakerId = SecurityHelper.getUserId();
        // Find speaker in DB
        Speaker speaker = speakerRepository.findById(speakerId).get();
        // Set chat speaker
        chat.setSpeaker(speaker);
        // Create chat access code using id of the latest chat + 1 as salt
        Chat latestChat = chatRepository.findFirstByOrderByIdDesc();
        Long newChatId = null;
        if (latestChat == null) {
            newChatId = Long.valueOf(1);
        } else {
            newChatId = latestChat.getId() + 1;
        }
        String salt = Long.toString(newChatId);
        Hashids hashids = new Hashids(salt, 4);
        String accessCode = hashids.encode(newChatId).toUpperCase();
        // Set chat access code
        chat.setAccessCode(accessCode);
        // Set chat creation date
        LocalDateTime creationDate = LocalDateTime.now();
        chat.setCreationDate(creationDate);
        // Save chat to DB
        chatRepository.save(chat);
    }

    @Override
    public void updateChat(Long chatId, UpdateChatDto updatedRoomDto) {
        Chat chat = chatRepository.findById(chatId).get();

        chat.setName(updatedRoomDto.getName());

        chatRepository.save(chat);
    }

    @Override
    public void deleteChat(Long roomId) {
        Chat chat = chatRepository.findById(roomId).get();
        chatRepository.delete(chat);
    }

    @Override
    public Chat getChat(Long chatId) {
        return chatRepository.findById(chatId).get();
    }

    @Override
    public Chat getChatByAccessCode(String accessCode) {
        return chatRepository.findByAccessCode(accessCode);
    }

    @Override
    public Page<Chat> getChatPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Long speakerId = SecurityHelper.getUserId();
        Page<Chat> chatPage = chatRepository.findBySpeakerIdOrderByCreationDateDesc(speakerId, pageable);
        return chatPage;
    }
}
