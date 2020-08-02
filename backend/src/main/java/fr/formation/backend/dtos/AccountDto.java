package fr.formation.backend.dtos;

import fr.formation.backend.constraints.UniqueUsername;
import fr.formation.backend.constraints.AccountPassword;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class AccountDto {

    @NotBlank
    @UniqueUsername
    private String username;

    @AccountPassword
    private String password;

    public AccountDto() {
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
