package com.basketball.league.repository;

import com.basketball.league.entity.TableField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableFieldRepository extends JpaRepository<TableField, Long> {
    TableField findByTeamId(Long teamId);

    boolean existsByTeamId(Long id);
}
