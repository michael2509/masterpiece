package fr.formation.backend.config;

import java.util.Set;
import java.util.stream.Collectors;

import fr.formation.backend.entities.Role;
import fr.formation.backend.viewdtos.AccountViewDto;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;


/**
 * A custom {@code UserDetails} for Spring authentication contract and custom
 * properties we want in the token (such as the id).
 */
public class CustomUserDetails extends User {

    private static final long serialVersionUID = 5803283930339051994L;

    private Long id;

    public CustomUserDetails(AccountViewDto user) {
		super(user.getUsername(), user.getPassword(), buildAuthorities(user.getRoles()));
		id = user.getId();
    }

    private static Set<GrantedAuthority> buildAuthorities(Set<Role> roles) {
	return roles.stream().map(r -> new SimpleGrantedAuthority(r.getCode().name()))
		.collect(Collectors.toUnmodifiableSet());
    }

    public Long getId() {
	return id;
    }

    @Override
    public String toString() {
	return "{id=" + id + ", authorities=" + getAuthorities()
		+ ", password=[PROTECTED], username=" + getUsername()
		+ "}";
    }
}
