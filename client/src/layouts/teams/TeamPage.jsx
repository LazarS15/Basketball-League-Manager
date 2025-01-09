import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlayersByTeamId, getTeamById } from "../../api/teamApi";
import { TeamsPlayerCard } from "./TeamsPlayerCard";
import SpinnerLoading from "../../utils/SpinnerLoading";

const TeamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const playersResponse = await getPlayersByTeamId(id);
        const teamResponse = await getTeamById(id);
        setTeam(teamResponse);
        setPlayers(playersResponse);
      } catch (error) {
        console.log("Error fetching team data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <SpinnerLoading />;

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Team info */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={team.logoPath}
            alt={`${team.name} logo`}
            className="w-24 h-24 rounded-md object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold">{team.name}</h1>
            <p className="text-lg text-gray-600">{team.hall}</p>
          </div>
        </div>
        <h1 className="text-xl font-semibold mb-4">Team image</h1>

        <div className="flex justify-center mb-8">
          <img
            src={team.imagePath}
            alt={`${team.name} team`}
            className="rounded-md shadow-md border max-w-full max-h-73 max-w-83 object-contain"
          />
        </div>

        {/* Players */}
        <h2 className="text-xl font-semibold mb-4">Players</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {players.map((player) => (
            <TeamsPlayerCard key={player.id} player={player} />
          ))}
        </div>
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

export default TeamPage;
