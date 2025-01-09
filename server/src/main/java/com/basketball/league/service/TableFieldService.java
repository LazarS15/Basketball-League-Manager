package com.basketball.league.service;

import com.basketball.league.entity.TableField;
import com.basketball.league.entity.Team;
import com.basketball.league.repository.TableFieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TableFieldService {

    private final TableFieldRepository tableFieldRepository;

    public void createTableField(Team team) {
        TableField tableField = TableField.builder()
                .teamId(team.getId())
                .wins(0)
                .losses(0)
                .plusMinus(0)
                .points(0)
                .build();

        tableFieldRepository.save(tableField);
    }


    public void refreshTableFields() {
        List<TableField> tableFields = tableFieldRepository.findAll();
        for (TableField tableField : tableFields) {
            tableField.setWins(0);
            tableField.setLosses(0);
            tableField.setPoints(0);
            tableField.setPlusMinus(0);
            tableFieldRepository.save(tableField);
        }
    }
}
