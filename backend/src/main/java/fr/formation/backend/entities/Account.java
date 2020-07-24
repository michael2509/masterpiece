package fr.formation.backend.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "accounts", uniqueConstraints = {
        @UniqueConstraint(name = "accounts_username_UQ", columnNames = {"username"}),
        @UniqueConstraint(name = "accounts_email_UQ", columnNames = {"email"})
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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "accounts_roles",
            joinColumns = @JoinColumn(name = "account_id", nullable = false),
            foreignKey = @ForeignKey(name = "accounts_roles_account_id_FK"),
            inverseJoinColumns = @JoinColumn(name = "role_id", nullable = false),
            inverseForeignKey = @ForeignKey(name = "accounts_roles_role_id_FK"),
            indexes = {
                @Index(name = "accounts_roles_account_id_IDX", columnList = "account_id"),
                @Index(name = "accounts_roles_role_id_IDX", columnList = "role_id")
            },
            uniqueConstraints = {
                @UniqueConstraint(
                    name = "accounts_roles_account_id_role_id_UQ",
                    columnNames = {"account_id", "role_id"}
                )
            }
    )
    private Set<Role> roles;

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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}

