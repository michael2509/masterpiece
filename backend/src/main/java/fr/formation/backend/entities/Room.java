package fr.formation.backend.entities;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "rooms", indexes = {
        @Index(name = "rooms_speaker_id_IDX", columnList = "speaker_id"),
})
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 120)
    private String name;

    @ManyToOne
    @JoinColumn(name = "speaker_id", nullable = false, foreignKey = @ForeignKey(name = "rooms_speakers_FK"))
    private Speaker speaker;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Guest> guest;

    @Column(name = "code", nullable = false, length = 10)
    private String code;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    @OrderBy("send_date desc")
    private List<Message> messages;

    public Room() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Speaker getSpeaker() {
        return speaker;
    }

    public void setSpeaker(Speaker speaker) {
        this.speaker = speaker;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public List<Guest> getGuest() {
        return guest;
    }

    public void setGuest(List<Guest> guest) {
        this.guest = guest;
    }
}
