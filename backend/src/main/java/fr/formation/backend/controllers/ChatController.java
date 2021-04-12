package fr.formation.backend.controllers;

import fr.formation.backend.dtos.ChatDto;
import fr.formation.backend.dtos.UpdateChatDto;
import fr.formation.backend.entities.Chat;
import fr.formation.backend.services.ChatService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

// This controller received request from endpoint /chats, and then call the corresponding service
@RestController
@RequestMapping("/chats")
public class ChatController {

    private final ChatService chatService;

    // Inject chat Service
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    // Method that handle post request from /chats endpoint
    @PostMapping
    protected void createChat(@Valid @RequestBody ChatDto chatDto) {
        chatService.createChat(chatDto);
    }

    @DeleteMapping("/{id}")
    protected void deleteChat(@PathVariable("id") Long chatId) {
        chatService.deleteChat(chatId);
    }

    @GetMapping("/{id}")
    protected Chat getChat(@PathVariable("id") Long chatId) {
        return chatService.getChat(chatId);
    }

    @GetMapping("getByAccessCode/{accessCode}")
    protected  Chat getChatByAccessCode(@PathVariable("accessCode") String accessCode) {
        return chatService.getChatByAccessCode(accessCode);
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
