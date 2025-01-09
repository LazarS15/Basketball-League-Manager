package com.basketball.league.entity;

import com.basketball.league.entity.id.PlayerStatsId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "player_stats")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(PlayerStatsId.class)
public class PlayerStats {

    @Id
    private Long gameId;
    @Id
    private Long playerId;

    private int playerPoints;
}

