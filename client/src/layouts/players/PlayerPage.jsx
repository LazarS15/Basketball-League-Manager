import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getPlayerById,
  getPlayerStatsByPlayerId,
  getTeamById,
} from "../../api/playerApi";
import SpinnerLoading from "../../utils/SpinnerLoading";

const PlayerPage = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState([]);
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerData = async () => {
      setIsLoading(true);
      try {
        const playerData = await getPlayerById(id);
        setPlayer(playerData);

        const statsData = await getPlayerStatsByPlayerId(id);
        setPlayerStats(statsData);

        const teamData = await getTeamById(playerData.teamId);
        setTeamData(teamData);
      } catch (err) {
        console.log("Error fetching player data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerData();
  }, [id]);

  const totalPoints =
    playerStats.length > 0
      ? playerStats.reduce((total, stat) => total + stat.playerPoints, 0)
      : 0;

  const averagePoints =
    playerStats.length > 0 ? (totalPoints / playerStats.length).toFixed(2) : 0;

  const gamesPlayed = playerStats.length;

  if (isLoading) return <SpinnerLoading />;

  return (
    <div className="p-4 sm:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-orange-600 text-white text-center py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {player.firstName} {player.lastName}
          </h1>
        </div>

        <div className="p-4 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start gap-6 bg-gray-100 p-4 rounded-lg shadow">
            <div className="w-full sm:w-1/3 flex-shrink-0">
              <img
                src={player.imagePath || "/placeholder.png"}
                alt={`${player.firstName} ${player.lastName}`}
                className="w-full h-auto rounded-lg shadow-md object-cover"
              />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <p className="text-gray-700 text-sm sm:text-lg">
                <span className="font-semibold">Birth date:</span> {player.birthDate}
              </p>
              <p className="text-gray-700 text-sm sm:text-lg">
                <span className="font-semibold">Number:</span> #
                {player.jerseyNumber}
              </p>

              {teamData && (
                <Link to={`/teams/${teamData.id}`}>
                  <div className="flex items-center justify-center mt-8 sm:justify-start gap-4">
                    <img
                      src={teamData.logoPath}
                      alt={teamData.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full border border-gray-300"
                    />
                    <p className="text-gray-700 text-sm sm:text-lg font-semibold">
                      {teamData.name}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Player Stats
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600 text-sm sm:text-base">
                  Average Points
                </p>
                <p className="text-xl sm:text-2xl font-bold">{averagePoints}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600 text-sm sm:text-base">
                  Games Played
                </p>
                <p className="text-xl sm:text-2xl font-bold">{gamesPlayed}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-4 sm:py-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 sm:px-6 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-700 transition text-xs sm:text-sm font-medium"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;

