package com.basketball.league.controller;

import com.basketball.league.feature.UpdateGameCommandHandler;
import com.basketball.league.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("api/secured/games")
@RequiredArgsConstructor
public class GameController {

    private final UpdateGameCommandHandler updateGameCommandHandler;
    private final GameService gameService;

    @GetMapping("/check-teams")
    public boolean checkTeams() {
        return gameService.checkIfTeamsHaveFewerPlayers();
    }
    @GetMapping("/check-schedule")
    public boolean checkSchedule() {
        return gameService.checkSchedule();
    }

    @PostMapping
    public ResponseEntity<Void> createSchedule() {
        gameService.generateGameSchedule();
        return ResponseEntity.created(URI.create("api/games")).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateGame(@PathVariable Long id) {
        updateGameCommandHandler.updateGame(id);
        return ResponseEntity.noContent().build();
    }
}
