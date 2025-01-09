import { useState, useEffect } from "react";
import { getGames, getTotalPages } from "../../../api/gamesApi";

export const useGames = (currentPage, gamesPerPage) => {
  const [games, setGames] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const url = `/games?page=${currentPage - 1}&size=${gamesPerPage}&sort=id`;
      const gamesData = await getGames(url);
      setGames(gamesData);
    } catch (err) {
      console.log("Error fetching games:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTotalPages = async () => {
    try {
      const url = `/games?page=0&size=${gamesPerPage}`;
      const pages = await getTotalPages(url);
      setTotalPages(pages);
    } catch (err) {
      console.log("Error fetching total pages:", err);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [currentPage, gamesPerPage]);

  useEffect(() => {
    fetchTotalPages();
  }, [gamesPerPage]);

  return { fetchGames, games, fetchTotalPages, totalPages, isLoading };
};
