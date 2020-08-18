package fr.formation.backend.dtos;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

public class RoomDto {

    @NotBlank
    @Size(max = 255)
    private String name;

    @NotNull
    private List<String> users;

    public RoomDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }
}
