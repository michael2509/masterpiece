package fr.formation.backend.dtos;

import fr.formation.backend.constraints.UniqueUsername;
import fr.formation.backend.constraints.UserPassword;

import javax.validation.constraints.NotBlank;

public class UserDto {

    @NotBlank
    @UniqueUsername
    private String username;

    @UserPassword
    private String password;

    public UserDto() {
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
