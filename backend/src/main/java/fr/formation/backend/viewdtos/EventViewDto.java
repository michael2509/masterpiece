package fr.formation.backend.viewdtos;

import java.time.LocalDateTime;

public interface EventViewDto {
    Long getId();
    String getName();
    LocalDateTime getStartDateTime();
    LocalDateTime getEndDateTime();
    String getCode();
    String getAccountUsername();
}
