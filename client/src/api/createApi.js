import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_SERVER_URL;
const BASE_URL = `${BACKEND_URL}/api`;

export const getTeams = async () => {
  return await axios
    .get(`${BASE_URL}/teams`)
    .then((response) => {
      return response.data._embedded.teams;
    })
    .catch((error) => {
      throw new Error("Can't fetch teams");
    });
};

export const createTeamRequest = async (teamBody, token) => {
  return await axios
    .post(`${BASE_URL}/secure/teams`, teamBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
};

export const createPlayerRequest = async (playerBody, token) => {
  return await axios
    .post(`${BASE_URL}/secure/players`, playerBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
};
