package fr.formation.backend.services;

import fr.formation.backend.dtos.GuestDto;
import fr.formation.backend.entities.Guest;
import fr.formation.backend.entities.Room;
import fr.formation.backend.entities.User;
import fr.formation.backend.repositories.GuestRepository;
import fr.formation.backend.repositories.RoomRepository;
import fr.formation.backend.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class GuestServiceImpl implements GuestService {

    private final GuestRepository guestRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public GuestServiceImpl(GuestRepository guestRepository, RoomRepository roomRepository, UserRepository userRepository) {
        this.guestRepository = guestRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity createGuest(GuestDto guestDto) {
        // Verify if a guest with same username already exist in the same room
        boolean guestAlreadyExist = guestRepository.existsByUserUsernameAndRoomCode(guestDto.getUsername(), guestDto.getRoomCode());

        if (guestAlreadyExist) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("IG");
        }

        // Find guest's room
        Room room = roomRepository.findRoomEntityByCode(guestDto.getRoomCode());

        // Convert guest dto to entity
        Guest guest = new Guest();
        guest.setRoom(room);

        // Set guest user
        User user = new User();
        user.setUsername(guestDto.getUsername());
        guest.setUser(user);

        // Save guest to dabatase
        guestRepository.save(guest);

        return ResponseEntity.status(HttpStatus.OK).body(guest);
    }
}
