package com.basketball.league.service;

import com.basketball.league.dto.TeamStatsDto;
import com.basketball.league.entity.Game;
import com.basketball.league.entity.PlayerStats;
import com.basketball.league.repository.GameRepository;
import com.basketball.league.repository.PlayerRepository;
import com.basketball.league.repository.PlayerStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PlayerStatsService {

    private final PlayerStatsRepository playerStatsRepository;
    private final PlayerRepository playerRepository;
    private final GameRepository gameRepository;

    public List<PlayerStats> getActivePlayerStats(Long playerId) {
        return playerStatsRepository.findByPlayerId(playerId).stream()
                .filter(stats -> gameRepository.findById(stats.getGameId())
                        .map(Game::isPlayed)
                        .orElse(false))
                .map(stats -> playerStatsRepository.findByGameIdAndPlayerId(stats.getGameId(), playerId))
                .toList();
    }


    public List<TeamStatsDto> getTeamStats(Long teamId, Long gameId) {
        return playerRepository.findByTeamId(teamId).stream()
                .map(player -> {
                    PlayerStats playerStats = playerStatsRepository.findByGameIdAndPlayerId(gameId, player.getId());
                    return playerStats != null
                            ? new TeamStatsDto(player, playerStats.getPlayerPoints())
                            : null;
                })
                .filter(Objects::nonNull)
                .toList();
    }

}
