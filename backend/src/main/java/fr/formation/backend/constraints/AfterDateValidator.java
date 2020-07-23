package fr.formation.backend.constraints;

import fr.formation.backend.dtos.EventDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDateTime;

public class AfterDateValidator implements ConstraintValidator<AfterDate, EventDto> {

    @Override
    public void initialize(AfterDate constraintAnnotation) {
    }

    @Override
    public boolean isValid(EventDto eventDto, ConstraintValidatorContext context) {

        LocalDateTime startDateTime = eventDto.getStartDateTime();
        LocalDateTime endDateTime = eventDto.getEndDateTime();

        return startDateTime.isBefore(endDateTime);
    }
}