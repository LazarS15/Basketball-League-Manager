import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGameById, getPlayerStatsByTeamIdAndGameId, getTeamById } from "../../api/gamesApi";
import TeamStatsTable from "./TeamStatsTable";
import SpinnerLoading from "../../utils/SpinnerLoading";

const GamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [homeTeamStats, setHomeTeamStats] = useState([]);
  const [guestTeamStats, setGuestTeamStats] = useState([]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameData = await getGameById(id);
        const homeTeamStatsData = await getPlayerStatsByTeamIdAndGameId(
          gameData.homeTeamId,
          Number(id)
        );
        const guestTeamStatsData = await getPlayerStatsByTeamIdAndGameId(
          gameData.guestTeamId,
          Number(id)
        );
        setGame(gameData);
        setHomeTeamStats(homeTeamStatsData);
        setGuestTeamStats(guestTeamStatsData);
      } catch (err) {
        console.error("Error fetching game details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (isLoading) return <SpinnerLoading />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <TeamStatsTable key={game.homeTeamId} teamId={game.homeTeamId} teamStats={homeTeamStats} />
        <TeamStatsTable key={game.guestTeamId} teamId={game.guestTeamId} teamStats={guestTeamStats} />
        <button
          onClick={() => navigate(-1)} 
          className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default GamePage;
