package fr.formation.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.formation.backend.config.SecurityHelper;
import fr.formation.backend.dtos.RoomDto;
import fr.formation.backend.dtos.UpdateRoomDto;
import fr.formation.backend.entities.Room;
import fr.formation.backend.repositories.RoomRepository;
import fr.formation.backend.services.RoomService;
import fr.formation.backend.viewdtos.RoomViewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;
    @Autowired
    private RoomRepository roomRepository;

    @PostMapping
    protected void createRoom(@Valid @RequestBody RoomDto roomDto) {
        roomService.createRoom(roomDto);
    }

    @DeleteMapping
    protected void deleteRoom(@RequestParam("roomId") Long roomId) {
        roomService.deleteRoom(roomId);
    }

    @GetMapping
    protected Page<RoomViewDto> getRoomListPage(@RequestParam("page") int page, @RequestParam("size") int size) {
        return roomService.getRoomListPage(page, size);
    }

    @PutMapping
    protected void updateRoom(@Valid @RequestBody UpdateRoomDto updatedRoomDto) {
        roomService.updateRoom(updatedRoomDto);
    }
}
