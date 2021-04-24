package fr.formation.backend.dtos;

import fr.formation.backend.constraints.UniqueUsername;
import fr.formation.backend.constraints.StrongPassword;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

// DTO to create speaker
public class SpeakerDto {

    @NotBlank
    @Size(max = 80)
    @UniqueUsername
    private String username;

    @StrongPassword
    @Size(max = 255)
    private String password;

    public SpeakerDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
