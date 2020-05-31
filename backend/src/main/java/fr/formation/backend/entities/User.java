package fr.formation.backend.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(
                name = "users_username_UQ",
                columnNames = {"username"}
        ),
        @UniqueConstraint(
                name = "users_email_UQ",
                columnNames = {"email"}
        )
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToMany
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", nullable = false),
            foreignKey = @ForeignKey(name = "users_roles_user_id_FK"),
            inverseJoinColumns = @JoinColumn(name = "roles_id", nullable = false),
            inverseForeignKey = @ForeignKey(name = "users_roles_roles_id_FK"),
            indexes = {
                    @Index(name = "users_roles_user_id_IDX", columnList = "user_id"),
                    @Index(name = "users_roles_roles_id_IDX", columnList = "roles_id")
            }
    )
    private Set<Role> roles;

    @Column(nullable = false)
    private boolean enabled = true;

    public User() {
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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}

