package com.basketball.league.seed;

import com.basketball.league.entity.TableField;
import com.basketball.league.repository.TableFieldRepository;
import com.basketball.league.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
@DependsOn("teamSeed")
@RequiredArgsConstructor
public class TableFieldSeed {

    private final TeamRepository teamRepository;
    private final TableFieldRepository tableFieldRepository;

    @PostConstruct
    public void seedTableFields() {
        if (teamRepository.count() == 0) {
            return;
        }
        teamRepository.findAll().forEach(team -> {
            if (!tableFieldRepository.existsByTeamId(team.getId())) {
                tableFieldRepository.save(TableField.builder()
                        .teamId(team.getId())
                        .wins(0)
                        .losses(0)
                        .plusMinus(0)
                        .points(0)
                        .build());
            }
        });
    }
}
