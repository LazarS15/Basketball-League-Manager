import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlayerStatsByPlayerId, getTeamById } from "../../api/playerApi";

const PlayerCard = ({ playerInfo }) => {
  const navigate = useNavigate();

  const [playerStats, setPlayerStats] = useState([]);
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const stats = await getPlayerStatsByPlayerId(playerInfo.id);
        setPlayerStats(stats);
      } catch (err) {
        console.error(err.message);
      }
    };

    const fetchTeamData = async () => {
      try {
        const team = await getTeamById(playerInfo.teamId);
        setTeamData(team);
      } catch (err) {
        console.log("Error fetching team data:", err);
      }
    };

    const fetchData = async () => {
      await fetchPlayerStats();
      await fetchTeamData();
    };

    fetchData();
  }, [playerInfo.id]);

  function calculatePointsPerGame() {
    if (!playerStats || playerStats.length === 0) {
      return 0;
    }
    const totalPoints = playerStats.reduce(
      (total, stat) => total + (stat.playerPoints ? stat.playerPoints : 0),
      0
    );
    return (totalPoints / playerStats.length).toFixed(2);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-6 hover:shadow-2xl transition-shadow w-full max-w-2xl">
      <img
        src={playerInfo.imagePath || "/default-player-image.png"}
        alt={`${playerInfo.firstName} ${playerInfo.lastName}`}
        className="w-24 h-25 sm:w-28 sm:h-30 rounded-lg mb-4 sm:mb-0 sm:mr-6 object-cover border border-gray-300"
      />
      <div className="flex-grow text-center sm:text-left">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
          {playerInfo.firstName} {playerInfo.lastName}
        </h3>
        <p className="text-gray-600 text-sm mb-1">
          Points per game:{" "}
          <span className="font-medium">{calculatePointsPerGame()}</span>
        </p>
        <p className="text-gray-500 text-xs">
          Team:{" "}
          <span className="font-medium">{teamData?.name || "Unassigned"}</span>
        </p>
      </div>
      <button
        className="mt-4 sm:mt-0 sm:ml-auto bg-orange-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-700 transition"
        onClick={() => navigate(`${playerInfo.id}`)}
      >
        View Details
      </button>
    </div>
  );
};

export default PlayerCard;
