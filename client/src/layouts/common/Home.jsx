import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b p-6 text-center">
      <img
        src="/basketball.webp"
        alt="Basketball League Logo"
        className="h-32 w-42 mb-6 opacity-80"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Basketball League Manager!
      </h1>
      
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        Manage players, teams, and games while tracking standings and game results in real time!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {isAuthenticated && (
          <>
            <Link
              to="/create-player"
              className="px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 text-center"
            >
              Create Player
            </Link>
            <Link
              to="/create-team"
              className="px-6 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-green-700 text-center"
            >
              Create Team
            </Link>
          </>
        )}
        <Link
          to="/standings"
          className="px-6 py-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-purple-700 text-center"
        >
          View Standings
        </Link>
        <Link
          to="/players"
          className="px-6 py-4 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-700 text-center"
        >
          View Players
        </Link>
        <Link
          to="/teams"
          className="px-6 py-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-red-700 text-center"
        >
          View Teams
        </Link>
        <Link
          to="/games"
          className="px-6 py-4 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-orange-700 text-center"
        >
          View Games
        </Link>
      </div>
      {!isAuthenticated && (
        <p className="text-sm text-red-500 mt-6">
          Login is required to create new players or teams.
        </p>
      )}
    </div>
  );
};

export default Home;
