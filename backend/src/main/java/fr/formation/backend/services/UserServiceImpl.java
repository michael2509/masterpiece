package fr.formation.backend.services;

import fr.formation.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public String getUsername(Long userId) {
        return userRepository.findById(userId).get().getUsername();
    }
}
