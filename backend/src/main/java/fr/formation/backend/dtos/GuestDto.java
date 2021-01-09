package fr.formation.backend.dtos;

import fr.formation.backend.constraints.UniqueUsername;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class GuestDto {

    @NotBlank
    @Size(max = 80)
    private String username;

    @NotBlank
    @Size(max = 10)
    private String roomCode;

    public GuestDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }
}
