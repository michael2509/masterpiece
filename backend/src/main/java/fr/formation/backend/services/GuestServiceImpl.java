package fr.formation.backend.services;

import fr.formation.backend.dtos.GuestDto;
import fr.formation.backend.entities.Guest;
import fr.formation.backend.entities.Room;
import fr.formation.backend.repositories.GuestRepository;
import fr.formation.backend.repositories.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class GuestServiceImpl implements GuestService {

    private final GuestRepository guestRepository;
    private final RoomRepository roomRepository;

    public GuestServiceImpl(GuestRepository guestRepository, RoomRepository roomRepository) {
        this.guestRepository = guestRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public ResponseEntity createGuest(GuestDto guestDto) {
        // Verify if a guest with same username already exist in the same room
        boolean guestAlreadyExist = guestRepository.existsByUsernameAndRoomCode(guestDto.getUsername(), guestDto.getRoomCode());

        if (guestAlreadyExist) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("IG");
        }

        // Find guest's room
        Room room = roomRepository.findRoomEntityByCode(guestDto.getRoomCode());

        // Convert guest dto to entity
        Guest guest = new Guest();
        guest.setUsername(guestDto.getUsername());
        guest.setRoom(room);

        // save guest to dabatase
        guestRepository.save(guest);

        return ResponseEntity.status(HttpStatus.OK).body(guest);
    }
}
