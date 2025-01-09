package com.basketball.league.seed;

import com.basketball.league.entity.Player;
import com.basketball.league.entity.Team;
import com.basketball.league.exception.models.NotFoundException;
import com.basketball.league.repository.PlayerRepository;
import com.basketball.league.repository.TeamRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@DependsOn("teamSeed")
@RequiredArgsConstructor
public class PlayerSeed {

    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;
    @Value("${application.cloudinary-url}")
    private String cloudinaryUrl;

    @PostConstruct
    public void seedPlayers() {
        if (playerRepository.count() < 18) {
            seedTeamPlayers("Paris Basketball", generateParisPlayers());
            seedTeamPlayers("Crvena Zvezda", generateCrvenaZvezdaPlayers());
            seedTeamPlayers("Partizan", generatePartizanPlayers());
        }
    }

    private void seedTeamPlayers(String teamName, List<Player> players) {
        Team team = teamRepository.findByName(teamName).orElseThrow(() ->
                new NotFoundException("Team " + teamName + " not found"));

        players.forEach(player -> {
            player.setTeamId(team.getId());
            playerRepository.save(player);
        });
    }

    private List<Player> generateParisPlayers() {
        return List.of(
                buildPlayer("Tj", "Shorts", 0,
                        cloudinaryUrl + "/image/upload/v1734603829/unnamed_z5pbzm.jpg",
                        LocalDate.of(1997,10,15)),

                buildPlayer("Nadire", "Hifi", 2,
                        cloudinaryUrl + "/image/upload/v1734604011/download_ape9ms.jpg",
                        LocalDate.of(2002,7,15)),

                buildPlayer("Maodo", "Lo", 12,
                        cloudinaryUrl + "/image/upload/v1734604296/download_fvmrjb.jpg",
                        LocalDate.of(1992,12,31)),

                buildPlayer("Kevarrius", "Hayes", 13,
                        cloudinaryUrl + "/image/upload/v1734604129/download_vdwbfw.jpg",
                        LocalDate.of(1997,3,5)),

                buildPlayer("Mikael", "Jantunen", 20,
                        cloudinaryUrl + "/image/upload/v1734605177/download_sxlwmn.jpg",
                        LocalDate.of(2000,4,20)),

                buildPlayer("Tyson ", "Ward", 3,
                        cloudinaryUrl + "/image/upload/v1734604337/download_h6j6dv.jpg",
                        LocalDate.of(1997,7,26)));
    }
    private List<Player> generatePartizanPlayers() {
        return List.of(
                buildPlayer("Carlik", "Jones", 2,
                        cloudinaryUrl + "/image/upload/v1734606531/download_nmcytt.jpg",
                        LocalDate.of(1997,12,23)),

                buildPlayer("Tyrique ", "Jones", 88,
                        cloudinaryUrl + "/image/upload/v1734606554/download_cm0vrv.jpg",
                        LocalDate.of(1997,5,3)),

                buildPlayer("Sterling ", "Brown", 12,
                        cloudinaryUrl + "/image/upload/v1734606648/brow-1ef840f4-aeac-61a2-83a3-e3b76f88269d_aez7un.jpg",
                        LocalDate.of(1995,2,10)),

                buildPlayer("Vanja", "Marinkovic", 9,
                        cloudinaryUrl + "/image/upload/v1734606790/download_m6cffv.webp",
                        LocalDate.of(1997,1,9)),

                buildPlayer("Aleksej", "Pokusevski", 11,
                        cloudinaryUrl + "/image/upload/v1734606816/images_zfwsgl.jpg",
                        LocalDate.of(2001,12,26)),

                buildPlayer("Frank ", "Ntilikina", 3,
                        cloudinaryUrl + "/image/upload/v1734607082/download_igxgg2.jpg",
                        LocalDate.of(1998,7,28)));
    }

    private List<Player> generateCrvenaZvezdaPlayers() {
        return List.of(
                buildPlayer("Filip", "Petrusev", 30,
                        cloudinaryUrl + "/image/upload/v1734605969/download_nos1s7.jpg",
                        LocalDate.of(2000,4,15)),

                buildPlayer("Nemanja ", "Nedovic", 36,
                        cloudinaryUrl + "/image/upload/v1734606036/download_uugcth.jpg",
                        LocalDate.of(1991,6,16)),

                buildPlayer("Milos ", "Teodosic", 4,
                        cloudinaryUrl + "/image/upload/v1734606053/download_yubot8.jpg",
                        LocalDate.of(1987,3,19)),

                buildPlayer("Isaiah ", "Canaan", 3,
                        cloudinaryUrl + "/image/upload/v1734606075/download_mb1icv.jpg",
                        LocalDate.of(1991,5,21)),

                buildPlayer("Yago", "Dos Santos", 99,
                        cloudinaryUrl + "/image/upload/v1734606089/download_qwgjcx.jpg",
                        LocalDate.of(1999,3,9)),

                buildPlayer("Joel ", "Bolomboy", 21,
                        cloudinaryUrl + "/image/upload/v1734606102/bolomboj-pojedinacna_yaudu1.webp",
                        LocalDate.of(1994,1,28)));

    }

    private Player buildPlayer(String firstName, String lastName,
                               int jerseyNumber, String imagePath,
                               LocalDate birthDate) {
        return Player.builder()
                .firstName(firstName)
                .lastName(lastName)
                .jerseyNumber(jerseyNumber)
                .imagePath(imagePath)
                .birthDate(birthDate)
                .build();
    }

}
