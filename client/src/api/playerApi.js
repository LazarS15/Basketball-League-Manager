import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_SERVER_URL;
const BASE_URL = `${BACKEND_URL}/api`;

export const getPlayers = () => {
  return axios
    .get(`${BASE_URL}/players?size=100000&sort=teamId`)
    .then((response) => {
      const data = response.data._embedded.players;
      return data
    })
    .catch((error) => {
      console.error("Error:", error);
      throw new Error("Failed to fetch players");
    });
};

export const getPlayerById = (id) => {
  return axios
    .get(`${BASE_URL}/players/${id}`)
    .then(response => response.data)
    .catch((error) => {
      console.error("Error fetching player details:", error);
      throw new Error("Failed to get player details");
    });
};

export const getPlayerStatsByPlayerId = (id) => {
  return axios
    .get(`${BASE_URL}/playerStats/active/${id}`)
    .then(response => response.data)
    .catch((error) => {
      throw new Error("Failed to get player stats by player id");
    });
};


export const getTeamById = (id) => {
  return axios
    .get(`${BASE_URL}/teams/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching team by player id:", error);
      throw new Error("Failed to get team by player id");
    });
};
