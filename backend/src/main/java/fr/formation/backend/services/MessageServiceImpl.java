package fr.formation.backend.services;

import fr.formation.backend.dtos.MessageDto;
import fr.formation.backend.entities.Message;
import fr.formation.backend.entities.Room;
import fr.formation.backend.entities.User;
import fr.formation.backend.repositories.MessageRepository;
import fr.formation.backend.repositories.RoomRepository;
import fr.formation.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public MessageServiceImpl(MessageRepository messageRepository, RoomRepository roomRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Message> getMessages(String roomCode) {
        return messageRepository.findByRoomCodeOrderBySendDateDesc(roomCode);
    }

    @Override
    public void postMessage(MessageDto messageDto) {
        // Find user in database
        User user = userRepository.findByUsername(messageDto.getUsername());

        // Find room where to post the message
        Room room = roomRepository.findRoomEntityByCode(messageDto.getRoomCode());

        // Build message entity from messageDto and room
        Message message = new Message();
        message.setUser(user);
        message.setMessage(messageDto.getMessage());
        message.setRoom(room);
        message.setSendDate(LocalDateTime.now());

        // Save message to DB
        messageRepository.save(message);
    }

    @Override
    public Boolean isUnique(MessageDto messageDto) {
        String username = messageDto.getUsername();
        String message = messageDto.getMessage();

        boolean uniqueMessage = !messageRepository.existsByUserUsernameAndMessage(username, message);

        return uniqueMessage;
    }
}
