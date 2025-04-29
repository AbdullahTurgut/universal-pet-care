package com.dailyalcorwork.universal_pet_care.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String gender;
    @Column(name = "mobile")
    private String phoneNumber;
    private String email;
    private String password;
    private String userType;
    private boolean isEnable;
    @CreationTimestamp
    private LocalDate createdAt;
    // @Transient -> hibernate bizim için bu sutunu kaydetmeyecek dbye.bu veterinere ait
    @Transient
    private String specialization;

    @Transient
    private List<Appointment> appointments = new ArrayList<>();

    @Transient
    private List<Review> reviews = new ArrayList<>();


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private Photo photo;

    // CascadeType.ALL yapmak yerine .REMOVE harici hepsini koyduk. Role silindiginde User silinmesin diye.
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles = new HashSet<>();

    // cascade -> remove -> user silindigi zaman token de silinecek
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<VerificationToken> verificationTokens = new ArrayList<>();

    public void removeUserPhoto() {
        if (this.getPhoto() != null) {
            this.setPhoto(null);
        }
    }


}
