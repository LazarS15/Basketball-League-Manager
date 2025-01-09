import React, { useState, useEffect } from "react";
import { getStandings, getTeamById } from "../../api/standingsApi";
import TeamRow from "./TeamRow";
import SpinnerLoading from "../../utils/SpinnerLoading";

const StandingsPage = () => {
  const [standings, setStandings] = useState([]);
  const [teamsData, setTeamsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const standingsData = await getStandings();
        setStandings(standingsData);

        const teamsDict = {};
        for (const field of standingsData) {
          const team = await getTeamById(field.teamId);
          teamsDict[team.id] = team;
        }

        setTeamsData(teamsDict);
      } catch (err) {
        console.error("Error fetching standings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <SpinnerLoading />;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-orange-600 text-white py-6 text-center">
          <h1 className="text-3xl font-bold">Standings</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="py-4 px-6">#</th>
                <th className="py-4 px-6">Team</th>
                <th className="py-4 px-6">Wins</th>
                <th className="py-4 px-6">Losses</th>
                <th className="py-4 px-6">+/-</th>
                <th className="py-4 px-6">Points</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((field, index) => {
                const team = teamsData[field.teamId];
                return <TeamRow key={field.id} index={index} field={field} team={team} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StandingsPage;