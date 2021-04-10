package fr.formation.backend.dtos;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

public class ChatDto {

    @NotBlank
    @Size(max = 120)
    private String name;

    public ChatDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
