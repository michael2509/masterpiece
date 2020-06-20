package fr.formation.backend.entities;

import javax.persistence.*;

@Entity
@Table(name = "accounts", uniqueConstraints = {
        @UniqueConstraint(name = "accounts_username_UQ", columnNames = {"username"}),
        @UniqueConstraint(name = "accounts_email_UQ", columnNames = {"email"})
},indexes = {
        @Index(name = "accounts_role_id_IDX", columnList = "role_id")
})
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false, foreignKey = @ForeignKey(name = "accounts_role_id_FK"))
    private Role role;

    @Column(nullable = false)
    private boolean enabled = true;

    public Account() {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}

