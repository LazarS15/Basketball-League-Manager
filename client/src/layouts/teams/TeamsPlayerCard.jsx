import { useNavigate } from "react-router-dom";

export const TeamsPlayerCard = ({ player }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/players/${player.id}`)} 
      className="flex items-center bg-gray-50 gap-4 bg-white shadow-lg rounded-lg p-4 hover:scale-105 transition-transform cursor-pointer"
    >
      <img
        src={player.imagePath}
        alt={`${player.firstName} ${player.lastName}`}
        className="w-20 h-21"
      />
      <div>
        <h3 className="text-lg font-bold">
          {player.firstName} {player.lastName}
        </h3>
        <p className="text-gray-600">#{player.jerseyNumber}</p>
      </div>
    </div>
  );
};
