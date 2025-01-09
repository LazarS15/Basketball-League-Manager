package com.basketball.league.repository;

import com.basketball.league.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    int countByTeamId(Long teamId);

    List<Player> findByTeamId(Long teamId);
}
