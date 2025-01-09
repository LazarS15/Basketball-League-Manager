package com.basketball.league.controller;

import com.basketball.league.dto.CreateTeamRequest;
import com.basketball.league.entity.Team;
import com.basketball.league.service.TeamService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("api/secure/teams")
@AllArgsConstructor
public class TeamController {

    private final TeamService commandHandler;

    @PostMapping
    public ResponseEntity<Void> createTeam(@RequestBody CreateTeamRequest request) {
        Team team = commandHandler.createTeam(request);
        URI location = URI.create(String.format("/api/teams/%s", team.getId()));
        return ResponseEntity.created(location).build();
    }
}
