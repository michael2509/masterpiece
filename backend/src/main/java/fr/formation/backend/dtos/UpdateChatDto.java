package fr.formation.backend.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UpdateChatDto {

    @NotBlank
    @Size(max = 80)
    private String name;

    public UpdateChatDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
