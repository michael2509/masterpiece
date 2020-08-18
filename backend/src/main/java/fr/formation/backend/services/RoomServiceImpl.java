package fr.formation.backend.services;

import fr.formation.backend.config.SecurityHelper;
import fr.formation.backend.dtos.RoomDto;
import fr.formation.backend.entities.User;
import fr.formation.backend.entities.Room;
import fr.formation.backend.repositories.UserRepository;
import fr.formation.backend.repositories.RoomRepository;
import fr.formation.backend.viewdtos.RoomViewDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void createRoom(RoomDto roomDto) {
        Room room = new Room();
        // Set room's name
        room.setName(roomDto.getName());
        // Set room's host
        Long hostId = SecurityHelper.getUserId();
        User host = userRepository.findById(hostId).get();
        room.setHost(host);
        // Set room's users
        List<String> usernameList = roomDto.getUsers();
        List<User> users = userRepository.findAllByUsernameIn(usernameList);
        room.setUsers(users);
        // Save room to database
        roomRepository.save(room);
    }

    @Override
    public Page<RoomViewDto> getRoomListPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Long userId = SecurityHelper.getUserId();
        Page<RoomViewDto> roomListPage = roomRepository.findAllByUsersId(userId, pageable);
        return roomListPage;
    }
}
