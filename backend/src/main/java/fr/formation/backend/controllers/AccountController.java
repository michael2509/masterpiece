package fr.formation.backend.controllers;

import fr.formation.backend.dtos.AccountDto;
import fr.formation.backend.services.AccountService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    protected void createAccount(@Valid @RequestBody AccountDto accountDto) {
        accountService.createAccount(accountDto);
    }
}
