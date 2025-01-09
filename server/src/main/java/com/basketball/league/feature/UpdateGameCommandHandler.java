package com.basketball.league.feature;

import com.basketball.league.entity.Game;
import com.basketball.league.entity.Player;
import com.basketball.league.entity.PlayerStats;
import com.basketball.league.exception.models.NotFoundException;
import com.basketball.league.repository.GameRepository;
import com.basketball.league.repository.PlayerStatsRepository;
import com.basketball.league.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;

@Component
@Slf4j
@RequiredArgsConstructor
public class UpdateGameCommandHandler {

    private final GameRepository gameRepository;
    private final PlayerStatsRepository playerStatsRepository;
    private final PlayerRepository playerRepository;
    private final UpdateTableFieldCommandHandler updateTableFieldCommandHandler;

    public static final int MIN_PLAYER_POINTS = 0;
    private static final int MAX_PLAYER_POINTS = 25;
    private static final int MAX_RETRY_ATTEMPTS = 5;

    public void updateGame(Long id) {
        log.info("Updating game with id: {}", id);
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Game with id: " + id + " doesn't exist"));

        List<PlayerStats> playerStats = playerStatsRepository.findByGameId(id);
        generateNewPlayerStatsIfNeeded(game, playerStats);
        if (game.isPlayed()) {
            restartGame(game, playerStats);
            return;
        }
        playAndRetryGameIfNeeded(game, playerStats);
    }

    private void generateNewPlayerStatsIfNeeded(Game game, List<PlayerStats> playerStats) {
        List<Player> players = playerRepository.findByTeamId(game.getHomeTeamId());
        players.addAll(playerRepository.findByTeamId(game.getGuestTeamId()));
        players.forEach(player -> {
            PlayerStats existingStats = playerStatsRepository.findByGameIdAndPlayerId(game.getId(), player.getId());

            if (existingStats == null) {
                PlayerStats newPlayerStats = PlayerStats.builder()
                        .gameId(game.getId())
                        .playerId(player.getId())
                        .playerPoints(0)
                        .build();

                playerStatsRepository.save(newPlayerStats);
                log.info("Created new PlayerStats for player {} in game {}", player.getId(), game.getId());
            }
        });
    }

    private void playAndRetryGameIfNeeded(Game game, List<PlayerStats> playerStats) {
        int retryAttempts = 0;
        while (game.getHomeTeamPoints() == game.getGuestTeamPoints() && retryAttempts < MAX_RETRY_ATTEMPTS) {
            game = playGame(game, playerStats);
            retryAttempts++;
        }

        if (game.getHomeTeamPoints() == game.getGuestTeamPoints() && retryAttempts == MAX_RETRY_ATTEMPTS) {
            restartGame(game, playerStats);
        } else {
            updateTableFieldCommandHandler.updateTableField(game);
        }
    }

    private Game playGame(Game game, List<PlayerStats> playerStats) {
        log.info("Playing game with id: {}", game.getId());
        Random random = new Random();
        for (PlayerStats playerStat : playerStats) {
            int playerPoints = random.nextInt(MIN_PLAYER_POINTS, MAX_PLAYER_POINTS);
            playerStat.setPlayerPoints(playerPoints);
            playerStatsRepository.save(playerStat);
        }
        int homeTeamPoints = calculateTeamPoints(game, game.getHomeTeamId());
        int guestTeamPoints = calculateTeamPoints(game, game.getGuestTeamId());
        game.setHomeTeamPoints(homeTeamPoints);
        game.setGuestTeamPoints(guestTeamPoints);
        game.setPlayed(true);
        return gameRepository.save(game);
    }

    private void restartGame(Game game, List<PlayerStats> playerStats) {
        log.info("Restarting game with id: {}", game.getId());
        updateTableFieldCommandHandler.restartTableField(game);
        for (PlayerStats playerStat : playerStats) {
            playerStat.setPlayerPoints(0);
            playerStatsRepository.save(playerStat);
        }
        game.setHomeTeamPoints(0);
        game.setGuestTeamPoints(0);
        game.setPlayed(false);
        gameRepository.save(game);
    }

    private int calculateTeamPoints(Game game, Long teamId) {
        List<Player> players = playerRepository.findByTeamId(teamId);
        return players.stream()
                .mapToInt(player ->
                        playerStatsRepository.findByGameIdAndPlayerId(game.getId(), player.getId())
                                .getPlayerPoints()).sum();
    }
}
