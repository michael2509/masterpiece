package fr.formation.backend.dtos;

import javax.validation.constraints.*;

// DTO to create chat
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

