package com.basketball.league.dto;


public record CreatePlayerRequest(String firstName, String lastName, int jerseyNumber, String teamName,
                                  String imagePath, String birthDate) {
}
