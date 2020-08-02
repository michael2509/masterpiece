package fr.formation.backend.services;

import fr.formation.backend.config.CustomUserDetails;
import fr.formation.backend.dtos.AccountDto;
import fr.formation.backend.entities.Account;
import fr.formation.backend.repositories.AccountRepository;
import fr.formation.backend.viewdtos.AccountViewDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public void createAccount(AccountDto accountDto) {

        // Convert DTO to entity
        ModelMapper modelMapper = new ModelMapper();
        Account account = modelMapper.map(accountDto, Account.class);

        // Encode the user's password
        String password = accountDto.getPassword();
        account.setPassword(passwordEncoder.encode(password));

        // Save user to database
        accountRepository.save(account);
    }

    @Override
    public boolean uniqueUsername(String username) {
        return username != null && !accountRepository.existsByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        AccountViewDto account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "no user found with username: " + username));
        return new CustomUserDetails(account);
    }
}
