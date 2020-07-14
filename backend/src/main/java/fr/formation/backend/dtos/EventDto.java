package fr.formation.backend.dtos;

import fr.formation.backend.constraints.ValidAfterDate;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

@ValidAfterDate()
public class EventDto {

    @NotNull
    @Size(max = 255)
    private String name;

    @NotNull
    @FutureOrPresent
    private LocalDateTime startDateTime;

    @NotNull
    @Future
    private LocalDateTime endDateTime;

    @NotNull
    private Long accountId;

    public EventDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }
}
