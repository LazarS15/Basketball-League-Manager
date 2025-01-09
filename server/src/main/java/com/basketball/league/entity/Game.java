package com.basketball.league.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "games")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int round;
    private Long homeTeamId;
    private int homeTeamPoints;
    private int guestTeamPoints;
    private Long guestTeamId;
    private boolean isPlayed;
}

