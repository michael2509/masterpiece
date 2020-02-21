package fr.formation.backend.services;

import fr.formation.backend.dtos.UserDto;
import fr.formation.backend.entities.Role;
import fr.formation.backend.entities.User;
import fr.formation.backend.repositories.RoleRepository;
import fr.formation.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    private void populateAndSave(UserDto userDto, User user) {
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());

        Role defaultRole = roleRepository.findByDefaultRole(true);
        Set<Role> roles = new HashSet();
        roles.add(defaultRole);
        user.setRoles(roles);

        userRepository.save(user);
    }

    @Override
    public void createAccount(UserDto userDto) {
        User user = new User();
        populateAndSave(userDto, user);
    }
}
