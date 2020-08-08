package fr.formation.backend.constraints;

import fr.formation.backend.dtos.MeetingDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDateTime;

public class AfterDateValidator implements ConstraintValidator<AfterDate, MeetingDto> {

    @Override
    public boolean isValid(MeetingDto meetingDto, ConstraintValidatorContext context) {

        LocalDateTime startDateTime = meetingDto.getStartDateTime();
        LocalDateTime endDateTime = meetingDto.getEndDateTime();

        return startDateTime.isBefore(endDateTime);
    }
}