package fr.formation.backend.services;

import fr.formation.backend.dtos.MessageDto;
import fr.formation.backend.entities.Message;

import java.util.List;

// Interface for message service
public interface MessageService {
    void postMessage(MessageDto messageDto);
    List<Message> getMessages(Long chatId);
}
