package fr.formation.backend.constraints;

import fr.formation.backend.dtos.MessageDto;
import fr.formation.backend.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueMessageValidator implements ConstraintValidator<UniqueMessage, MessageDto> {

    @Autowired
    private MessageService messageService;

    public boolean isValid(MessageDto messageDto, ConstraintValidatorContext context) {
        return messageService.isUnique(messageDto);
    }
}
