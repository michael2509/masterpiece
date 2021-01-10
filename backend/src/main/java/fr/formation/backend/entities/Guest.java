package fr.formation.backend.entities;

import javax.persistence.*;

@Entity
@Table(
        name = "guests",
        indexes = {
                @Index(name = "guests_room_id_IDX", columnList = "room_id"),
                @Index(name = "guests_user_id_IDX", columnList = "user_id"),
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "guests_user_id_room_id_UQ", columnNames = {"user_id", "room_id"}),
        }
)
public class Guest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false, foreignKey = @ForeignKey(name = "guests_rooms_FK"))
    private Room room;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "guests_users_FK"))
    private User user;

    public Guest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
