package fr.formation.backend.entities;

import fr.formation.backend.enums.EnumRole;

import javax.persistence.*;

@Entity
@Table(name = "roles", uniqueConstraints = {
        @UniqueConstraint(
                name = "roles_code_UQ",
                columnNames = "code"
        )
})
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false, columnDefinition = EnumRole.columnDefinition)
    @Enumerated(EnumType.STRING)
    private EnumRole code;

    @Column(nullable = false)
    private boolean defaultRole;

    public Role() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EnumRole getCode() {
        return code;
    }

    public void setCode(EnumRole code) {
        this.code = code;
    }

    public boolean isDefaultRole() {
        return defaultRole;
    }

    public void setDefaultRole(boolean defaultRole) {
        this.defaultRole = defaultRole;
    }
}
