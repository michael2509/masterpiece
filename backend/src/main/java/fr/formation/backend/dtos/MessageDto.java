package fr.formation.backend.dtos;

import fr.formation.backend.constraints.UniqueMessage;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@UniqueMessage
public class MessageDto {

    @NotBlank
    @Size(max = 80)
    private String author;

    @NotBlank
    @Size(max = 255)
    private String message;

    @NotNull
    @Size(max = 10)
    private String roomCode;

    public MessageDto() {
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }
}
