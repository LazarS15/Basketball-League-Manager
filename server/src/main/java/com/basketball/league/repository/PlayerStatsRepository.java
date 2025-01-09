package com.basketball.league.repository;

import aj.org.objectweb.asm.commons.Remapper;
import com.basketball.league.entity.PlayerStats;
import com.basketball.league.entity.id.PlayerStatsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PlayerStatsRepository extends JpaRepository<PlayerStats, PlayerStatsId> {
    List<PlayerStats> findByGameId(Long gameId);

    List<PlayerStats> findByPlayerId(Long playerId);

    PlayerStats findByGameIdAndPlayerId(Long gameId, Long playerId);
}
