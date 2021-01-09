package fr.formation.backend.entities;

import javax.persistence.*;

@Entity
@Table(name = "speakers", uniqueConstraints = {
        @UniqueConstraint(name = "speakers_username_UQ", columnNames = {"username"}),
})
public class Speaker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String username;

    @Column(nullable = false, length = 255)
    private String password;

    public Speaker() {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

