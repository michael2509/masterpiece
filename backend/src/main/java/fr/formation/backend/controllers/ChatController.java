package fr.formation.backend.controllers;

import fr.formation.backend.dtos.ChatDto;
import fr.formation.backend.dtos.UpdateChatDto;
import fr.formation.backend.entities.Chat;
import fr.formation.backend.repositories.ChatRepository;
import fr.formation.backend.services.ChatService;
import fr.formation.backend.viewdtos.ChatViewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;
    @Autowired
    private ChatRepository chatRepository;

    @PostMapping
    protected void createChat(@Valid @RequestBody ChatDto chatDto) {
        chatService.createChat(chatDto);
    }

    @DeleteMapping("/{id}")
    protected void deleteChat(@PathVariable("id") Long chatId) {
        chatService.deleteChat(chatId);
    }

    @GetMapping("/{id}")
    protected Chat getRoom(@PathVariable("id") Long chatId) {
        return chatService.getChat(chatId);
    }

    @GetMapping
    protected Page<Chat> getChatPage(@RequestParam("page") int page, @RequestParam("size") int size) {
        return chatService.getChatPage(page, size);
    }

    @PutMapping("/{id}")
    protected void updateChat(@PathVariable("id") Long chatId, @Valid @RequestBody UpdateChatDto updateChatDto) {
        chatService.updateChat(chatId, updateChatDto);
    }
}
