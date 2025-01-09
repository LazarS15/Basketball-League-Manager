import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../utils/PaginationForAllEntities";
import { getPlayers } from "../../api/playerApi";
import PlayerCard from "./PlayerCard";
import SpinnerLoading from "../../utils/SpinnerLoading";

const PlayerList = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setIsLoading(true);
        const data = await getPlayers();
        setPlayers(data);
        setIsLoading(false);
      } catch (err) {
        console.log("Error fetching players:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayers();
  }, []);


  // Filter players
  const filteredPlayers = players.filter((player) => {
    const search = searchTerm.toLowerCase();
    return (
      player.firstName.toLowerCase().startsWith(search) ||
      player.lastName.toLowerCase().startsWith(search)
    );
  });

  // Pagination
  const paginatedPlayers = filteredPlayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  if (isLoading) return <SpinnerLoading />;

  return (
    <div className="p-8 min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchTerm(e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div>
            {isAuthenticated ? (
              <button
                className="ml-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium"
                onClick={() => navigate("/create-player")}
              >
                Create Player
              </button>
            ) : (
              <p className="text-red-500 text-lg px-6">
                To create players you need to be logged in!
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          {paginatedPlayers.length === 0 ? (
            <div className="text-center">
              <h1 className="text-gray-500">No players found. Create one!</h1>
            </div>
          ) : (
            paginatedPlayers.map((player) => (
              <PlayerCard key={player.id} playerInfo={player} />
            ))
          )}
        </div>
      </div>

      {filteredPlayers.length > itemsPerPage && (
        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredPlayers.length}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerList;
