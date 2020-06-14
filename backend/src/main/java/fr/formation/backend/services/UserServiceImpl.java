package fr.formation.backend.services;

import fr.formation.backend.dtos.UserDto;
import fr.formation.backend.entities.Role;
import fr.formation.backend.entities.User;
import fr.formation.backend.repositories.RoleRepository;
import fr.formation.backend.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void createAccount(UserDto userDto) {

        // Convert DTO to entity
        ModelMapper modelMapper = new ModelMapper();
        User user = modelMapper.map(userDto, User.class);

        // Encode the user's password
        String password = userDto.getPassword();
        user.setPassword(passwordEncoder.encode(password));

        // Add default role to user
        Role defaultRole = roleRepository.findByDefaultRole(true);
        Set<Role> roles = new HashSet<Role>();
        roles.add(defaultRole);
        user.setRoles(roles);

        // Save user to database
        userRepository.save(user);
    }
}
