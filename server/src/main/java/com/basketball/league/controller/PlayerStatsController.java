package com.basketball.league.controller;

import com.basketball.league.dto.TeamStatsDto;
import com.basketball.league.entity.PlayerStats;
import com.basketball.league.service.PlayerStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/playerStats")
@RequiredArgsConstructor
public class PlayerStatsController {

    private final PlayerStatsService playerStatsService;

    @GetMapping("/active/{playerId}")
    public List<PlayerStats> getActivePlayerStats(@PathVariable Long playerId) {
        return playerStatsService.getActivePlayerStats(playerId);
    }

    @GetMapping
    public List<TeamStatsDto> getTeamStats(@RequestParam Long teamId,
                                                   @RequestParam Long gameId) {
        return playerStatsService.getTeamStats(teamId, gameId);
    }
}
