import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getTeams } from "../../api/teamApi"
import TeamCard from "./TeamCard";
import SpinnerLoading from "../../utils/SpinnerLoading";

const TeamList = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const response = await getTeams();
        setTeams(response);
      } catch (error) {
        console.log("Error fetching teams:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (isLoading) return <SpinnerLoading />;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Teams</h1>

      <div className="flex justify-between items-center mb-6">
        {isAuthenticated ? (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium"
            onClick={() => navigate("/create-team")}
          >
            Create Team
          </button>
        ) : (
          <p className="text-lg text-red-500">To create teams you need to be logged in!</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};

export default TeamList;
