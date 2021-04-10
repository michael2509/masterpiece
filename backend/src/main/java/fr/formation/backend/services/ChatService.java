package fr.formation.backend.services;

import fr.formation.backend.dtos.ChatDto;
import fr.formation.backend.dtos.UpdateChatDto;
import fr.formation.backend.entities.Chat;
import fr.formation.backend.viewdtos.ChatViewDto;
import org.springframework.data.domain.Page;

public interface ChatService {

    void createChat(ChatDto chatDto);
    void updateChat(Long chatId, UpdateChatDto updatedRoomDto);
    void deleteChat(Long chatId);
    Chat getChat(Long chatId);
    Page<Chat> getChatPage(int page, int size);
}
