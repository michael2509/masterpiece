package fr.formation.backend.controllers;

import fr.formation.backend.config.SecurityHelper;
import fr.formation.backend.services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping ("/getusername")
    protected String getUsername() {
        Long userId = SecurityHelper.getUserId();
        System.out.println(userId);
        return userService.getUsername(userId);
    }
}
