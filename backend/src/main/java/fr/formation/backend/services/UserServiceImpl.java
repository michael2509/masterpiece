package fr.formation.backend.services;

import fr.formation.backend.config.CustomUserDetails;
import fr.formation.backend.dtos.UserDto;
import fr.formation.backend.entities.User;
import fr.formation.backend.repositories.UserRepository;
import fr.formation.backend.viewdtos.UserViewDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public void createUser(UserDto userDto) {

        // Convert DTO to entity
        ModelMapper modelMapper = new ModelMapper();
        User user = modelMapper.map(userDto, User.class);

        // Encode the user's password
        String password = userDto.getPassword();
        user.setPassword(passwordEncoder.encode(password));

        // Save user to database
        userRepository.save(user);
    }

    @Override
    public boolean uniqueUsername(String username) {
        return username != null && !userRepository.existsByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        UserViewDto account = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "no user found with username: " + username));
        return new CustomUserDetails(account);
    }
}
