package com.apartment.entity;

import java.util.Date;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name = "user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    private String email;

    private Integer status;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createTime;
}
