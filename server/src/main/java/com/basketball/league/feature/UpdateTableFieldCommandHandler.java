package com.basketball.league.feature;

import com.basketball.league.entity.Game;
import com.basketball.league.entity.TableField;
import com.basketball.league.repository.TableFieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UpdateTableFieldCommandHandler {

    private final TableFieldRepository tableFieldRepository;

    public void updateTableField(Game game) {
        updateTeamTable(game.getGuestTeamId(), game.getGuestTeamPoints(), game.getHomeTeamPoints());
        updateTeamTable(game.getHomeTeamId(), game.getHomeTeamPoints(), game.getGuestTeamPoints());
    }

    public void restartTableField(Game game) {
        resetTeamTable(game.getHomeTeamId(), game.getHomeTeamPoints(), game.getGuestTeamPoints());
        resetTeamTable(game.getGuestTeamId(), game.getGuestTeamPoints(), game.getHomeTeamPoints());
    }

    private void updateTeamTable(Long teamId, int teamPoints, int opponentPoints) {
        TableField tableField = tableFieldRepository.findByTeamId(teamId);

        if (teamPoints > opponentPoints) {
            tableField.setWins(tableField.getWins() + 1);
        } else {
            tableField.setLosses(tableField.getLosses() + 1);
        }

        int plusMinusChange = teamPoints - opponentPoints;
        tableField.setPlusMinus(tableField.getPlusMinus() + plusMinusChange);
        tableField.setPoints(tableField.getPoints() + (teamPoints > opponentPoints ? 2 : 1));

        tableFieldRepository.save(tableField);
    }

    private void resetTeamTable(Long teamId, int teamPoints, int opponentPoints) {
        TableField tableField = tableFieldRepository.findByTeamId(teamId);

        // Undo win/loss changes
        if (teamPoints > opponentPoints) {
            tableField.setWins(tableField.getWins() - 1);
        } else {
            tableField.setLosses(tableField.getLosses() - 1);
        }

        // Undo plus/minus
        int plusMinusChange = teamPoints - opponentPoints;
        tableField.setPlusMinus(tableField.getPlusMinus() - plusMinusChange);

        // Undo points
        tableField.setPoints(tableField.getPoints() - (teamPoints > opponentPoints ? 2 : 1));

        tableFieldRepository.save(tableField);
    }
}
