package fr.formation.backend.constraints;

import fr.formation.backend.services.SpeakerService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

// unique username validator
public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    @Autowired
    private SpeakerService speakerService;

    public boolean isValid(String username, ConstraintValidatorContext context) {
        return speakerService.uniqueUsername(username);
    }
}
