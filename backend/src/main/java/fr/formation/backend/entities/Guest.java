package fr.formation.backend.entities;

import javax.persistence.*;

@Entity
@Table(
        name = "guests",
        indexes = {@Index(name = "guest_room_id_IDX", columnList = "room_id")},
        uniqueConstraints = {@UniqueConstraint(name = "guest_username_room_id_UQ", columnNames = {"username", "room_id"})}
)
public class Guest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String username;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false, foreignKey = @ForeignKey(name = "guest_room_id_FK"))
    private Room room;

    public Guest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}
