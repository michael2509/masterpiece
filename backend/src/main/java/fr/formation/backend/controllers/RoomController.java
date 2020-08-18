package fr.formation.backend.controllers;

import fr.formation.backend.dtos.RoomDto;
import fr.formation.backend.services.RoomService;
import fr.formation.backend.viewdtos.RoomViewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    protected void createRoom(@Valid @RequestBody RoomDto roomDto) {
        roomService.createRoom(roomDto);
    }

    @GetMapping()
    protected Page<RoomViewDto> getRoomListPage(@RequestParam("page") int page, @RequestParam("size") int size) {
        return roomService.getRoomListPage(page, size);
    }
}
