import React from "react";
import { Link } from "react-router-dom";

const TeamCard = ({ team }) => {
  return (
    <Link
      to={`/teams/${team.id}`}
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
    >
      <div className="flex items-center p-4">
        <img
          src={team.logoPath || "/placeholder-logo.png"}
          alt={`${team.name} logo`}
          className="w-16 h-16 rounded-md object-contain border border-gray-300"
        />
        <div className="ml-4">
          <h2 className="text-lg font-bold text-gray-800">{team.name}</h2>
          <p className="text-sm text-gray-600">{team.hall || "Unknown Hall"}</p>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
