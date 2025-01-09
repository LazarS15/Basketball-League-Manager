import { useState } from "react";
import { getTeamById, checkTeamsRequest } from "../../../api/gamesApi";
import { useAuth0 } from "@auth0/auth0-react";

export const useTeams = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [teams, setTeams] = useState({});
  const [hasFewerPlayers, setHasFewerPlayers] = useState(false);

  const fetchTeams = async (teamIds) => {
    try {
      const uniqueTeamIds = Array.from(new Set(teamIds));
      const newTeams = await Promise.all(
        uniqueTeamIds
          .filter((id) => !teams[id]) 
          .map((id) => getTeamById(id))
      );

      const updatedTeams = newTeams.reduce((acc, team) => {
        acc[team.id] = team;
        return acc;
      }, {});

      setTeams((prev) => ({ ...prev, ...updatedTeams }));
    } catch (err) {
      console.error("Error fetching teams:", err);
    }
  };

  const checkHasFewerPlayers = async () => {
    const token = await getAccessTokenSilently();
    const response = await checkTeamsRequest(token);
    setHasFewerPlayers(response);
  };

  return { teams, fetchTeams, checkHasFewerPlayers, hasFewerPlayers };
};
