package fr.formation.backend.services;

import fr.formation.backend.dtos.UserDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    void createUser(UserDto userDto);

    UserDetails loadUserByUsername(String username);

    boolean uniqueUsername(String username);
}
