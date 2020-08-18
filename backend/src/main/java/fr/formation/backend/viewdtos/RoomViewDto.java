package fr.formation.backend.viewdtos;

import fr.formation.backend.entities.User;

import java.util.List;

public interface RoomViewDto {
    Long getId();
    String getName();
    String getHostUsername();
    List<String> getAllUsersUsername();
}
