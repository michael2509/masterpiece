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

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private SpeakerRepository speakerRepository;

    @Override
    public void createChat(ChatDto chatDto) {
        Chat chat = new Chat();
        // Set chat name
        chat.setName(chatDto.getName());
        // Set chat speaker
        Long speakerId = SecurityHelper.getUserId();
        // Set speaker
        Speaker speaker = speakerRepository.findById(speakerId).get();
        chat.setSpeaker(speaker);
        // Create chat access code
        Long chatsTableSize = chatRepository.count();
        String salt = String.valueOf(chatsTableSize);
        Hashids hashids = new Hashids(salt, 4);
        String accessCode = hashids.encode(chatsTableSize).toUpperCase();
        // Set chat access code
        chat.setAccessCode(accessCode);
        // Set room's creation date
        LocalDateTime creationDate = LocalDateTime.now();
        chat.setCreationDate(creationDate);
        // Save room to database
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
    public Page<Chat> getChatPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Long speakerId = SecurityHelper.getUserId();
        Page<Chat> chatPage = chatRepository.findBySpeakerIdOrderByCreationDateDesc(speakerId, pageable);
        return chatPage;
    }
}
