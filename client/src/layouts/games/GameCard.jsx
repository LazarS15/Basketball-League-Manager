import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const GameCard = ({ game, homeTeam, guestTeam, onUpdate, disabled }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-300 hover:shadow-lg transition-shadow duration-300">
      {/* Round Information */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Round {game.round}
        </h3>
      </div>

      {/* Teams and Result */}
      <div className="flex flex-col sm:flex-row items-center justify-between">
        {/* Home Team */}
        <div className="flex flex-col items-center sm:items-end space-y-2 w-1/3">
          <img
            src={homeTeam?.logoPath || "/default-logo.png"}
            alt={`${homeTeam?.name} logo`}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-contain"
          />
          <span className="text-sm sm:text-base font-medium text-gray-800 text-center">
            {homeTeam?.name}
          </span>
        </div>

        {/* Result */}
        <div className="text-center text-lg sm:text-2xl font-bold text-orange-700 bg-orange-100 px-6 py-3 rounded-xl shadow my-4 sm:my-0 flex items-center w-2/3 sm:w-auto justify-center">
          <span>{game.homeTeamPoints}</span>
          <span className="mx-3">:</span>
          <span>{game.guestTeamPoints}</span>
        </div>

        {/* Guest Team */}
        <div className="flex flex-col items-center sm:items-start space-y-2 w-1/3">
          <img
            src={guestTeam?.logoPath || "/default-logo.png"}
            alt={`${guestTeam?.name} logo`}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-contain"
          />
          <span className="text-sm sm:text-base font-medium text-gray-800 text-center">
            {guestTeam?.name}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row sm:justify-center sm:space-x-4 space-y-4 sm:space-y-0">
        {isAuthenticated && (
          <button
            onClick={() => onUpdate(game.id)}
            className={`py-3 px-6 rounded-lg font-medium shadow transition duration-300 w-full sm:w-auto ${
              disabled
                ? "bg-orange-400 text-white cursor-not-allowed"
                : "bg-orange-600 text-white hover:bg-orange-700"
            }`}
            disabled={disabled}
          >
            Change Result
          </button>
        )}
        <button
          onClick={() => navigate(`/games/${game.id}`)}
          className={`py-3 px-6 rounded-lg font-medium shadow transition duration-300 w-full sm:w-auto ${
            disabled
              ? "bg-red-400 text-white cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
          disabled={disabled}
        >
          Players Stats
        </button>
      </div>
    </div>
  );
};

export default GameCard;
