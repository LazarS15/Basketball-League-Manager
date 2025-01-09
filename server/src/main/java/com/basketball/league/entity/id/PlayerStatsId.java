package com.basketball.league.entity.id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerStatsId implements Serializable {
    private Long gameId;
    private Long playerId;
}

