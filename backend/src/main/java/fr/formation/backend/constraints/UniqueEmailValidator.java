package fr.formation.backend.constraints;

import fr.formation.backend.repositories.AccountRepository;
import fr.formation.backend.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

    @Autowired
    private AccountService accountService;

    public boolean isValid(String email, ConstraintValidatorContext context) {
        return accountService.uniqueEmail(email);
    }
}
