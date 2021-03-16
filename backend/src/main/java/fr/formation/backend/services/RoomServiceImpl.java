package fr.formation.backend.services;

import fr.formation.backend.config.SecurityHelper;
import fr.formation.backend.dtos.RoomDto;
import fr.formation.backend.dtos.UpdateRoomDto;
import fr.formation.backend.entities.Speaker;
import fr.formation.backend.entities.Room;
import fr.formation.backend.entities.User;
import fr.formation.backend.repositories.SpeakerRepository;
import fr.formation.backend.repositories.RoomRepository;
import fr.formation.backend.repositories.UserRepository;
import fr.formation.backend.viewdtos.RoomViewDto;
import org.hashids.Hashids;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private SpeakerRepository speakerRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void createRoom(RoomDto roomDto) {
        Room room = new Room();
        // Set room's name
        room.setName(roomDto.getName());
        // Set room's host
        Long userId = SecurityHelper.getUserId();
        // Set speaker
        Speaker speaker = speakerRepository.findSpeakerEntityByUserId(userId);
        room.setSpeaker(speaker);
        // Create room's code
        Long roomsTableSize = roomRepository.count();
        String salt = String.valueOf(roomsTableSize);
        Hashids hashids = new Hashids(salt, 4);
        String code = hashids.encode(roomsTableSize).toUpperCase();
        // Set room's code
        room.setCode(code);
        // Set room's creation date
        LocalDateTime creationDate = LocalDateTime.now();
        room.setCreationDate(creationDate);
        // Save room to database
        roomRepository.save(room);
    }

    @Override
    public void updateRoom(UpdateRoomDto updatedRoomDto) {
        Room room = roomRepository.findById(updatedRoomDto.getId()).get();

        room.setName(updatedRoomDto.getName());

        roomRepository.save(room);
    }

    @Override
    public void deleteRoom(Long roomId) {
        Room room = roomRepository.findById(roomId).get();
        roomRepository.delete(room);
    }

    @Override
    public RoomViewDto getRoom(String code) {
        return roomRepository.findByCode(code);
    }

    @Override
    public Page<RoomViewDto> getRoomListPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Long userId = SecurityHelper.getUserId();
        Page<RoomViewDto> roomListPage = roomRepository.findBySpeakerUserIdOrderByCreationDateDesc(userId, pageable);
        return roomListPage;
    }
}
