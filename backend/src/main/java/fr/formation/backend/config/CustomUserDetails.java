package fr.formation.backend.config;

import java.util.ArrayList;

import fr.formation.backend.entities.Speaker;
import fr.formation.backend.viewdtos.SpeakerViewDto;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;


/**
 * A custom {@code UserDetails} for Spring authentication contract and custom
 * properties we want in the token (such as the id).
 */
public class CustomUserDetails extends User {

    private Long id;

    public CustomUserDetails(Speaker speaker) {
		super(speaker.getUsername(), speaker.getPassword(), new ArrayList<GrantedAuthority>());
		id = speaker.getId();
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
