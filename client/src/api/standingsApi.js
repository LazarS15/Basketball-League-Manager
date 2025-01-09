import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_SERVER_URL;
const BASE_URL = `${BACKEND_URL}/api`;

export const getStandings = async () => {
  return await axios
    .get(`${BASE_URL}/tableFields?sort=points,desc&sort=plusMinus,desc`)
    .then((response) => {
      const data = response.data._embedded.tableFields;
      return data;
    })
    .catch((error) => {
      throw new Error("Can't get Table Fields");
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
      throw new Error("Can't get team with id " + id);
    });
};
