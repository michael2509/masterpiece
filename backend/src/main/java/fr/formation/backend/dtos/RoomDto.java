package fr.formation.backend.dtos;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

public class RoomDto {

    @NotBlank
    @Size(max = 255)
    private String name;

    public RoomDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
