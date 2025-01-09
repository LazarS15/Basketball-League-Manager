package com.basketball.league.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "table_fields")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TableField {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long teamId;
    private int wins;
    private int losses;
    private int plusMinus;
    private int points;
}


