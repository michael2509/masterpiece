package fr.formation.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "messages",
        indexes = {
                @Index(name = "messages_room_id_IDX", columnList = "room_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(name ="messages_author_message_send_date_uq", columnNames = {"author", "message", "send_date"})
        }
)
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "author", nullable = false, length = 80)
    private String author;

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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
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
}