package fr.formation.backend.entities;

import javax.persistence.*;

@Entity
@Table(name = "speakers", uniqueConstraints = {
        @UniqueConstraint(name = "speakers_user_id_UQ", columnNames = {"user_id"}),
})
public class Speaker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "speakers_users_FK"))
    private User user;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

