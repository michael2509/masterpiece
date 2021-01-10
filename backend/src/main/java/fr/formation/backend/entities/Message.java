package fr.formation.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "messages",
        indexes = {
                @Index(name = "messages_room_id_IDX", columnList = "room_id"),
                @Index(name = "messages_user_id_IDX", columnList = "user_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "messages_user_id_room_id_message_send_date_UQ", columnNames = {"user_id", "room_id", "message", "send_date"})
        }
)
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "messages_users_FK"))
    private User user;

    @Column(name = "message", nullable = false, length = 255)
    private String message;

    @Column(name = "send_date", nullable = false)
    private LocalDateTime sendDate;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false, foreignKey = @ForeignKey(name = "messages_rooms_FK"))
    private Room room;

    public Message() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getSendDate() {
        return sendDate;
    }

    public void setSendDate(LocalDateTime sendDate) {
        this.sendDate = sendDate;
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