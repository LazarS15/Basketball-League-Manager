package com.basketball.league.seed;

import com.basketball.league.entity.Team;
import com.basketball.league.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class TeamSeed {

    private final TeamRepository teamRepository;
    @Value("${application.cloudinary-url}")
    private String cloudinaryUrl;

    @PostConstruct
    public void seedTeams() {
        if (teamRepository.count() < 3) {
            teamRepository.save(Team.builder()
                    .name("Paris Basketball")
                    .logoPath(cloudinaryUrl + "/image/upload/v1734605643/images_pqtu1h.png")
                    .imagePath(cloudinaryUrl + "/image/upload/v1734974263/2175085877-scaled_s721zv.jpg")
                    .hall("Paris Arena")
                    .build());

            teamRepository.save(Team.builder()
                    .name("Crvena Zvezda")
                    .logoPath(cloudinaryUrl + "/image/upload/v1734606282/download_bd6osr.png")
                    .imagePath(cloudinaryUrl + "/image/upload/v1734605823/c384e857-crvena-zvezda-euroleague-media-day-2024-2025_dnmnas.jpg")
                    .hall("Belgrade Arena")
                    .build());

            teamRepository.save(Team.builder()
                    .name("Partizan")
                    .logoPath(cloudinaryUrl + "/image/upload/v1734606395/download_ybnwwv.png")
                    .imagePath(cloudinaryUrl + "/image/upload/v1734606429/team-photo-bc-partizan_cicewu.jpg")
                    .hall("Belgrade Arena")
                    .build());
        }
    }
}

