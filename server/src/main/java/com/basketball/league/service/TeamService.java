package com.basketball.league.service;

import com.basketball.league.dto.CreateTeamRequest;
import com.basketball.league.entity.Team;
import com.basketball.league.exception.models.AlreadyExistsException;
import com.basketball.league.exception.models.LimitExceededException;
import com.basketball.league.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamService {

    private static final int MAX_TEAMS = 20;
    private final TeamRepository teamRepository;
    private final TableFieldService tableFieldService;
    public Team createTeam(CreateTeamRequest request) {
        validateRequest(request);

        Team team = Team.builder()
                .hall(request.hall())
                .name(request.name())
                .logoPath(request.logoPath())
                .imagePath(request.imagePath())
                .build();
        Team savedTeam = teamRepository.save(team);

        tableFieldService.createTableField(savedTeam);
        return savedTeam;
    }

    private void validateRequest(CreateTeamRequest request) {
        if (teamRepository.existsByName(request.name())) {
            throw new AlreadyExistsException("Team with name " + request.name() + " already exists.");
        }
        if (teamRepository.count() >= MAX_TEAMS) {
            throw new LimitExceededException("League limit of teams is 20");
        }
    }
}
