package fr.formation.backend.controllers;

import fr.formation.backend.dtos.MessageDto;
import fr.formation.backend.entities.Message;
import fr.formation.backend.errors.ValidationError;
import fr.formation.backend.services.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.handler.annotation.support.MethodArgumentNotValidException;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
public class MessageController {

    private final MessageService messageService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public MessageController(MessageService messageService, SimpMessagingTemplate simpMessagingTemplate) {
        this.messageService = messageService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @GetMapping("/messages/room/{roomCode}")
    protected List<Message> getMessages (@PathVariable("roomCode") String roomCode) {
        return messageService.getMessages(roomCode);
    }

    @MessageMapping("user-all")
    @SendTo("/topic/user")
    protected ResponseEntity sendToAll(@Valid @RequestBody MessageDto messageDto, SimpMessageHeaderAccessor headerAccessor) throws MethodArgumentNotValidException {
        // Insert message to DB
        messageService.postMessage(messageDto);

        // Send reply only to the message sender
        SimpMessageHeaderAccessor ha = SimpMessageHeaderAccessor
                .create(SimpMessageType.MESSAGE);
        ha.setSessionId(headerAccessor.getSessionId());
        ha.setLeaveMutable(true);
        simpMessagingTemplate.convertAndSendToUser(headerAccessor.getSessionId(), "/queue/success", "message envoyé avec succès", ha.getMessageHeaders());

        // Send message to all subscribers
        return ResponseEntity.ok().body(messageDto);
    }

    @MessageExceptionHandler
    @SendToUser("/queue/errors")
    public ResponseEntity handleException(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        // Spring field errors:
        List<FieldError> fieldErrors = result.getFieldErrors();
        // Custom field errors:
        List<ValidationError> validationErrors = new ArrayList<>();
        for (FieldError fieldError : fieldErrors) {
            String attribute = fieldError.getField();
            String code = fieldError.getCode();
            ValidationError validationError = new ValidationError(attribute, code);
            validationErrors.add(validationError);
        }

        List<ObjectError> globalErrors = ex.getBindingResult().getGlobalErrors();
        for (ObjectError globalError : globalErrors) {
            String code = globalError.getCode();
            ValidationError validationError = new ValidationError(code);
            validationErrors.add(validationError);
        }

        return ResponseEntity.badRequest().body(validationErrors);
    }
}
