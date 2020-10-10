package fr.formation.backend.config;

import java.util.ArrayList;

import fr.formation.backend.viewdtos.UserViewDto;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;


/**
 * A custom {@code UserDetails} for Spring authentication contract and custom
 * properties we want in the token (such as the id).
 */
public class CustomUserDetails extends User {

    private Long id;

    public CustomUserDetails(UserViewDto user) {
		super(user.getUsername(), user.getPassword(), new ArrayList<GrantedAuthority>());
		id = user.getId();
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
