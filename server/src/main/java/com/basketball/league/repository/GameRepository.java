package com.basketball.league.repository;

import com.basketball.league.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    boolean existsByHomeTeamId(Long homeTeamId);
    boolean existsByGuestTeamId(Long guestTeamId);
}
