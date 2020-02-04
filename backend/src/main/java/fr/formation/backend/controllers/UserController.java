package fr.formation.backend.controllers;

import fr.formation.backend.dtos.UserDto;
import fr.formation.backend.services.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    protected String createAccount(@Valid @RequestBody UserDto userDto) {
        String msg = userService.createAccount(userDto);
        return msg;
    }
}
