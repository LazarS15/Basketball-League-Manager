import React, { useState, useRef, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useGames } from "./hooks/useGames";
import { useTeams } from "./hooks/useTeams";
import { useSchedule } from "./hooks/useSchedule";
import GameCard from "./GameCard";
import Pagination from "../../utils/PaginationForPaginatedEntities";
import { updateGame } from "../../api/gamesApi";
import SpinnerLoading from "../../utils/SpinnerLoading";

const GamesList = ({setIsHeaderBlocked}) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [currentPage, setCurrentPage] = useState(1);
  const [disableButtons, setDisableButtons] = useState(false); 
  const gamesPerPage = 5;
  const gamesListRef = useRef(null);

  const {
    fetchGames,
    games,
    fetchTotalPages,
    totalPages,
    isLoading: gamesLoading,
  } = useGames(currentPage, gamesPerPage);
  const { fetchTeams, teams, checkHasFewerPlayers, hasFewerPlayers } =
    useTeams();
  const {
    handleSchedule,
    isScheduled,
    isLoading: isScheduleLoading,
  } = useSchedule();

  useEffect(() => {
    const teamIds = games.flatMap((game) => [
      game.homeTeamId,
      game.guestTeamId,
    ]);
    fetchTeams(teamIds);
    if (isAuthenticated) {
      checkHasFewerPlayers();
    }
  }, [games]);

  const handleUpdateGame = async (gameId) => {
    try {
      setIsHeaderBlocked(true);
      setDisableButtons(true); 
      const token = await getAccessTokenSilently();
      await updateGame(gameId, token);
      const scrollPosition = window.scrollY;
      await fetchGames();

      window.scrollTo(0, scrollPosition);
      setIsHeaderBlocked(false);
    } catch (err) {
      console.error("Error updating game:", err);
    } finally {
      setDisableButtons(false); 
    }
  };

  const paginate = (page) => setCurrentPage(page);

  if (gamesLoading || isScheduleLoading) return <SpinnerLoading />;

  return (
    <div className="min-h-screen p-2">
      <div
        className="max-w-[90%] mx-auto bg-white shadow rounded-lg p-6 sm:p-8"
        ref={gamesListRef}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          Games List
        </h1>
        {isAuthenticated && !isScheduled && (
          <div className="mb-6">
            {hasFewerPlayers ? (
              <h2 className="text-lg font-bold text-red-600">
                Some teams don't have enough players to play games, create them
              </h2>
            ) : (
              <>
                <h2 className="text-lg font-bold text-red-600 mb-2">
                  New teams detected. Click to recreate the schedule:
                </h2>
                <button
                  onClick={() => handleSchedule(fetchGames, fetchTotalPages, setIsHeaderBlocked)}
                  className="bg-red-600 text-white py-2 px-5 rounded-lg font-medium hover:bg-red-700 transition ease-in-out duration-300"
                >
                  Schedule Games
                </button>
              </>
            )}
          </div>
        )}
        <div>
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              homeTeam={teams[game.homeTeamId]}
              guestTeam={teams[game.guestTeamId]}
              onUpdate={handleUpdateGame}
              disabled={disableButtons} 
            />
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            disableButtons={disableButtons}
          />
        )}
      </div>
    </div>
  );
};

export default GamesList;
