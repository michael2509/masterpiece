package fr.formation.backend.constraints;

import fr.formation.backend.dtos.EventDto;
import fr.formation.backend.entities.Event;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDateTime;

public class ValidAfterDateValidator implements ConstraintValidator<ValidAfterDate, EventDto> {

    @Override
    public void initialize(ValidAfterDate constraintAnnotation) {
    }

    @Override
    public boolean isValid(EventDto eventDto, ConstraintValidatorContext context) {

        LocalDateTime startDateTime = eventDto.getStartDateTime();
        LocalDateTime endDateTime = eventDto.getEndDateTime();

        return startDateTime.isBefore(endDateTime);
    }
}