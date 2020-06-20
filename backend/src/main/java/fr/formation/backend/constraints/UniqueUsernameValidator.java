package fr.formation.backend.constraints;

import fr.formation.backend.repositories.AccountRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {
    private AccountRepository accountRepository;

    public UniqueUsernameValidator(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public void initialize(UniqueUsername constraint) {
    }

    public boolean isValid(String username, ConstraintValidatorContext context) {
        return username != null && !accountRepository.findByUsername(username).isPresent();
    }
}
