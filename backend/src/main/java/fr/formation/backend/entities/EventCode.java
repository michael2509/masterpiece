package fr.formation.backend.entities;

import javax.persistence.*;

@Entity
@Table(name = "events_codes")
public class EventCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "code")
    private Event event;

    public EventCode() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
