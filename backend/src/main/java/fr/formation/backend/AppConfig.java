package fr.formation.backend;

import fr.formation.backend.dtos.EventDto;
import fr.formation.backend.entities.Event;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AppConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        PropertyMap<EventDto, Event> eventPropertyMap = new PropertyMap<EventDto, Event>() {
            @Override
            protected void configure() {
                skip(destination.getId());
            }
        };

        modelMapper.addMappings(eventPropertyMap);
        return modelMapper;
    }
}
