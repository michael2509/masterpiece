package fr.formation.backend.constraints;

import fr.formation.backend.repositories.AccountRepository;
import fr.formation.backend.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    @Autowired
    private AccountService accountService;

    public boolean isValid(String username, ConstraintValidatorContext context) {
        return accountService.uniqueUsername(username);
    }
}
