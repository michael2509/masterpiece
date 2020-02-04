package fr.formation.backend.services;

import fr.formation.backend.dtos.UserDto;
import fr.formation.backend.entities.User;
import fr.formation.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private void populateAndSave(UserDto userDto, User user) {
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        userRepository.save(user);
    }

    @Override
    public String createAccount(UserDto userDto) {
        User user = new User();
        populateAndSave(userDto, user);
        return "Votre compte a été créer avec succès !";
    }
}
