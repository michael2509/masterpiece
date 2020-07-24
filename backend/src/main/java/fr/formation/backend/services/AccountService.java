package fr.formation.backend.services;

import fr.formation.backend.dtos.AccountDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountService extends UserDetailsService {

    void createAccount(AccountDto accountDto);

    UserDetails loadUserByUsername(String username);

    boolean uniqueUsername(String username);
    boolean uniqueEmail(String email);
}
