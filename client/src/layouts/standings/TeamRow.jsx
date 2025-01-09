import React from "react";
import { Link } from "react-router-dom";

const TeamRow = ({ index, field, team }) => {
  return (
    <tr
      key={field.id}
      className={`${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      } hover:bg-gray-100 transition`}
    >
      <td
        className="text-lg font-bold py-4 px-6 sticky left-0 bg-inherit z-10 text-center"
        style={{ minWidth: "40px" }}
      >
        {index + 1}
      </td>

      <td
        className="py-4 px-6 sticky left-[40px] bg-inherit z-10 flex items-center"
        style={{ minWidth: "150px" }}
      >
        <Link
          to={`/teams/${field.teamId}`}
          className="flex items-center hover:underline truncate"
        >
          {team ? (
            <>
              <img
                src={team.logoPath}
                alt={`${team.name} logo`}
                className="w-8 h-8 sm:w-10 sm:h-10 mr-2 object-contain"
              />
              <span className="text-black text-sm sm:text-base truncate">{team.name}</span>
            </>
          ) : (
            "Loading..."
          )}
        </Link>
      </td>

      {/* Ostali podaci */}
      <td className="py-4 px-6 text-sm sm:text-lg text-center">{field.wins ?? 0}</td>
      <td className="py-4 px-6 text-sm sm:text-lg text-center">{field.losses ?? 0}</td>
      <td className="py-4 px-6 text-sm sm:text-lg text-center">{field.plusMinus ?? 0}</td>
      <td className="py-4 px-6 font-bold text-sm sm:text-lg text-center">{field.points ?? 0}</td>
    </tr>
  );
};

export default TeamRow;