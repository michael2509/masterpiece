package fr.formation.backend.constraints;

import fr.formation.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    @Autowired
    private UserService userService;

    public boolean isValid(String username, ConstraintValidatorContext context) {
        return userService.uniqueUsername(username);
    }
}
