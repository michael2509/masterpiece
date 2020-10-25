package fr.formation.backend.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class MessageDto {

    @NotBlank
    @Size(max = 80)
    private String author;

    @NotBlank
    @Size(max = 255)
    private String message;

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
}
