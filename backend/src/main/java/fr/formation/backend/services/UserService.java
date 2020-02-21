package fr.formation.backend.services;

import fr.formation.backend.dtos.UserDto;

public interface UserService {

    void createAccount(UserDto userDto);
}
