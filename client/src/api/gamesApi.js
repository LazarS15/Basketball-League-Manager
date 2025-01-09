import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_SERVER_URL;
const BASE_URL = `${BACKEND_URL}/api`;

export const getGames = async (url) => {
  return await axios
    .get(BASE_URL + url)
    .then((response) => {
      const data = response.data._embedded.games;
      return data;
    })
    .catch((error) => {
      throw new Error("Failed to fetch games.");
    });
};

export const getGameById = async (id) => {
  return await axios
    .get(`${BASE_URL}/games/${id}`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => {
      throw new Error("Failed to fetch game by ID.");
    });
};

export const getTeamById = async (id) => {
  return await axios
    .get(`${BASE_URL}/teams/${id}`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => {
      throw new Error("Failed to fetch team data.");
    });
};

export const checkTeamsRequest = async (token) => {
  return await axios
    .get(`${BASE_URL}/secured/games/check-teams`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => {
      throw new Error("Failed to check teams.");
    });
}

export const getPlayerStatsByTeamIdAndGameId = async(teamId, gameId) => {
  return await axios.get(`${BASE_URL}/playerStats?teamId=${teamId}&gameId=${gameId}`)
  .then(response => response.data)
  .catch(error => {
    throw new Error("Can't fetch player stats for team with id: " + teamId);
  })
}

export const getTotalPages = async (url) => {
  return await axios
    .get(BASE_URL + url)
    .then((response) =>  response.data.page.totalPages)
    .catch((error) => {
      throw new Error("Failed to fetch total pages");
    });
};

export const checkSchedule = async (token) => {
  return await axios
    .get(`${BASE_URL}/secured/games/check-schedule`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => {
      throw new Error("Failed to check schedule.");
    });
};

export const createSchedule = async (token) => {
  return await axios
    .post(
      `${BASE_URL}/secured/games`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((error) => {
      throw new Error("Failed to create schedule.");
    });
};

export const updateGame = async (id, token) => {
  return await axios
    .put(
      `${BASE_URL}/secured/games/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((error) => {
      throw new Error("Failed to update game.");
    });
};
