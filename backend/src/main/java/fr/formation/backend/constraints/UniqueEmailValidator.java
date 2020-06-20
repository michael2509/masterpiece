package fr.formation.backend.constraints;

import fr.formation.backend.repositories.AccountRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
    private AccountRepository accountRepository;

    public UniqueEmailValidator(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public void initialize(UniqueEmail constraint) {
    }

    public boolean isValid(String email, ConstraintValidatorContext context) {
        return email != null && !accountRepository.findByEmail(email).isPresent();
    }
}
