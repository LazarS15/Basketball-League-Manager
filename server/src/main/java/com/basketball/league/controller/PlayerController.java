package com.basketball.league.controller;

import com.basketball.league.dto.CreatePlayerRequest;
import com.basketball.league.entity.Player;
import com.basketball.league.service.PlayerService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("api/secure/players")
@AllArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @PostMapping
    public ResponseEntity<Void> createPlayer(@RequestBody CreatePlayerRequest request) {
        Player player = playerService.createPlayer(request);
        URI location = URI.create(String.format("/api/teams/%s", player.getId()));
        return ResponseEntity.created(location).build();
    }
}
