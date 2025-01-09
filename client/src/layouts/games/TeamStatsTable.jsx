import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeamById } from "../../api/gamesApi";

const TeamStatsTable = ({ teamId, teamStats }) => {
  const [team, setTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const teamData = await getTeamById(teamId);
        setTeam(teamData);
      } catch (err) {
      }
    };
    fetchTeam();
  }, [teamId]);

  return (
    <div className="mb-8">
      <div
        className="flex items-center gap-4 mb-6 cursor-pointer hover:bg-gray-100 p-4 rounded-md"
        onClick={() => navigate(`/teams/${team?.id}`)}
      >
        <img
          src={team?.logoPath || "/default-team-logo.png"}
          alt={`${team?.name} logo`}
          className="w-16 h-17"
        />
        <h2 className="text-2xl font-semibold text-orange-600">{team?.name}</h2>
      </div>

      <table className="w-full border-collapse bg-gray-50 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-orange-500 text-white">
            <th className="px-4 py-2 text-left">Player</th>
            <th className="px-4 py-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {teamStats.map((stat) => (
            <tr
              key={stat.player.id}
              className="text-left border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/players/${stat.player.id}`)}
            >
              <td className="px-4 py-2 flex items-center gap-3">
                <img
                  src={stat.player.imagePath || "/default-player.png"}
                  alt={`${stat.player.firstName} ${stat.player.lastName}`}
                  className="w-13 h-14"
                />
                <div>
                  <span className="font-bold text-gray-700">
                    #{stat.player.jerseyNumber}
                  </span>{" "}
                  <span className="text-gray-800">{`${stat.player.firstName} ${stat.player.lastName}`}</span>
                </div>
              </td>
              <td className="px-4 py-2 text-center text-gray-700">
                {stat.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamStatsTable;
