package com.basketball.league.service;

import com.basketball.league.entity.Game;
import com.basketball.league.entity.Player;
import com.basketball.league.entity.PlayerStats;
import com.basketball.league.entity.Team;
import com.basketball.league.exception.models.LimitExceededException;
import com.basketball.league.repository.GameRepository;
import com.basketball.league.repository.PlayerRepository;
import com.basketball.league.repository.PlayerStatsRepository;
import com.basketball.league.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final PlayerRepository playerRepository;
    private final PlayerStatsRepository playerStatsRepository;
    private final TeamRepository teamRepository;
    private final TableFieldService tableFieldService;

    private static final int MIN_PLAYERS_PER_TEAM = 6;

    public boolean checkIfTeamsHaveFewerPlayers() {
        for (Team team : teamRepository.findAll()) {
            if (teamHasFewerPlayers(team.getId())) {
                return true;
            }
        }
        return false;
    }

    public boolean checkSchedule() {
        log.debug("Checking if all teams have scheduled games.");
        boolean allTeamsScheduled = teamRepository.findAll().stream()
                .allMatch(team -> gameRepository.existsByHomeTeamId(team.getId()) ||
                        gameRepository.existsByGuestTeamId(team.getId()));
        log.debug("All teams scheduled: {}", allTeamsScheduled);
        return allTeamsScheduled;
    }

    @Transactional
    public void generateGameSchedule() {
        log.info("Starting game schedule generation.");
        List<Team> teams = new ArrayList<>(teamRepository.findAll());
        teams.forEach(this::validateTeams);
        playerStatsRepository.deleteAll();
        gameRepository.deleteAll();

        if (teams.size() % 2 != 0) {
            teams.add(createDummyTeam());
        }

        List<Game> games = createRoundRobinSchedule(teams);
        gameRepository.saveAll(games);
        tableFieldService.refreshTableFields();
        log.info("Game schedule generation completed successfully.");
    }

    private List<Game> createRoundRobinSchedule(List<Team> teams) {
        log.debug("Creating round-robin schedule for {} teams.", teams.size());
        List<Game> games = new ArrayList<>();
        int numTeams = teams.size();
        int circles = numTeams - 1;

        int round = 0;
        for (int circle = 0; circle < circles; circle++) {
            round++;
            for (int i = 0; i < numTeams / 2; i++) {
                Team home = teams.get(i);
                Team away = teams.get(numTeams - 1 - i);
                if (!isDummyTeam(home) && !isDummyTeam(away)) {
                    games.add(createGame(round, home.getId(), away.getId()));
                }
            }
            rotateTeams(teams);
        }

        int initialSize = games.size();
        for (int i = 0; i < initialSize; i++) {
            Game game = games.get(i);
            games.add(createGame(game.getRound() + circles, game.getGuestTeamId(), game.getHomeTeamId()));
        }
        log.debug("Round-robin schedule creation completed with {} games.", games.size());
        return games;
    }

    private void rotateTeams(List<Team> teams) {
        Team last = teams.removeLast();
        teams.add(1, last);
        log.trace("Teams rotated for next round.");
    }

    private boolean isDummyTeam(Team team) {
        return "Dummy".equals(team.getName());
    }

    private Team createDummyTeam() {
        return Team.builder().id(0L).name("Dummy").build();
    }

    private void validateTeams(Team team) {
        if (teamHasFewerPlayers(team.getId())) {
            log.error("Team {} has fewer than {} players.", team.getName(), MIN_PLAYERS_PER_TEAM);
            throw new LimitExceededException("Team " + team.getName() + " must have at least "
                    + MIN_PLAYERS_PER_TEAM + " players to play the game.");
        }
    }

    private boolean teamHasFewerPlayers(Long teamId) {
        long playerCount = playerRepository.countByTeamId(teamId);
        return playerCount < MIN_PLAYERS_PER_TEAM;
    }

    private Game createGame(int round, Long homeTeamId, Long guestTeamId) {
        log.debug("Creating game for round {}: Home Team ID {}, Guest Team ID {}.", round, homeTeamId, guestTeamId);
        Game game = Game.builder()
                .round(round)
                .homeTeamId(homeTeamId)
                .guestTeamId(guestTeamId)
                .homeTeamPoints(0)
                .guestTeamPoints(0)
                .isPlayed(false)
                .build();

        Game savedGame = gameRepository.save(game);
        createPlayerStatsForGame(savedGame, homeTeamId);
        createPlayerStatsForGame(savedGame, guestTeamId);
        log.debug("Game created with ID {}.", savedGame.getId());
        return savedGame;
    }

    private void createPlayerStatsForGame(Game game, Long teamId) {
        log.trace("Creating player stats for game ID {} and team ID {}.", game.getId(), teamId);
        List<Player> players = playerRepository.findByTeamId(teamId);

        players.forEach(player -> {
            PlayerStats playerStats = PlayerStats.builder()
                    .gameId(game.getId())
                    .playerId(player.getId())
                    .playerPoints(0)
                    .build();
            playerStatsRepository.save(playerStats);
        });
    }
}