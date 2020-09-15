package fr.formation.backend.services;

import fr.formation.backend.dtos.RoomDto;
import fr.formation.backend.viewdtos.RoomViewDto;
import org.springframework.data.domain.Page;

public interface RoomService {

    void createRoom(RoomDto roomDto);
    void deleteRoom(Long roomId);
    Page<RoomViewDto> getRoomListPage(int page, int size);
}
