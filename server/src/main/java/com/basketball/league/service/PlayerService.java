package com.basketball.league.service;

import com.basketball.league.dto.CreatePlayerRequest;
import com.basketball.league.entity.Player;
import com.basketball.league.entity.Team;
import com.basketball.league.exception.models.AlreadyExistsException;
import com.basketball.league.exception.models.LimitExceededException;
import com.basketball.league.exception.models.NotFoundException;
import com.basketball.league.repository.PlayerRepository;
import com.basketball.league.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class PlayerService {

    private static final int MAX_PLAYERS_PER_TEAM = 12;
    private final TeamRepository teamRepository;
    private final PlayerRepository playerRepository;

    public Player createPlayer(CreatePlayerRequest request) {
        Team team = teamRepository.findByName(request.teamName())
                .orElseThrow(() -> new NotFoundException("Can't find team with name " + request.teamName()));
        validateRequest(request, team);

        if (playerRepository.countByTeamId(team.getId()) > MAX_PLAYERS_PER_TEAM) {
            throw new LimitExceededException("Each team can't have more than 12 players");
        }

        Player player = Player.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .imagePath(request.imagePath())
                .jerseyNumber(request.jerseyNumber())
                .birthDate(LocalDate.parse(request.birthDate()))
                .teamId(team.getId())
                .build();
        log.info("Saving player with name {}", request.firstName());
        return playerRepository.save(player);
    }

    private void validateRequest(CreatePlayerRequest request, Team team) {
        List<Player> players = playerRepository.findByTeamId(team.getId());
        players.forEach(player -> {
            if (request.jerseyNumber() == player.getJerseyNumber()) {
                throw new AlreadyExistsException("Jersey number " + player.getJerseyNumber() +
                        " is already taken in " + team.getName());
            }
        });
    }
}
