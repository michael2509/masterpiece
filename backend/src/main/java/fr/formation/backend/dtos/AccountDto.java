package fr.formation.backend.dtos;

import fr.formation.backend.constraints.UniqueEmail;
import fr.formation.backend.constraints.UniqueUsername;
import fr.formation.backend.constraints.AccountPassword;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class AccountDto {

    @NotNull
    @UniqueUsername
    private String username;

    @Email
    @UniqueEmail
    private String email;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
