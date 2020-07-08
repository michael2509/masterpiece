package fr.formation.backend.constraints;

import fr.formation.backend.entities.Event;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ValidAfterDateValidator implements ConstraintValidator<ValidAfterDate, Event> {

    @Override
    public void initialize(ValidAfterDate constraintAnnotation) {
    }

    @Override
    public boolean isValid(Event event, ConstraintValidatorContext context) {

        return event.getStartDateTime().compareTo(event.getEndDateTime()) > 0;
    }
}