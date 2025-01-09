import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_SERVER_URL;
const BASE_URL = `${BACKEND_URL}/api`;

export const getTeamById = async (id) => {
  return await axios
    .get(`${BASE_URL}/teams/${id}`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => {
      throw new Error("Failed to get team data");
    });
};

export const getTeams = async () => {
  return await axios
    .get(`${BASE_URL}/teams`)
    .then((response) => {
      const data = response.data._embedded.teams;
      return data;
    })
    .catch((error) => {
      throw new Error("Failed to get teams data");
    });
};
export const getPlayersByTeamId = async (teamId) => {
  return await axios
    .get(`${BASE_URL}/players/search/findByTeamId?teamId=${teamId}`)
    .then((response) => {
      const data = response.data._embedded.players;
      return data;
    })
    .catch((error) => {
      throw new new Error("Failed to get players")();
    });
};
