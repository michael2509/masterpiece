package fr.formation.backend.services;

import fr.formation.backend.dtos.AccountDto;

public interface AccountService {

    void createAccount(AccountDto accountDto);
}
