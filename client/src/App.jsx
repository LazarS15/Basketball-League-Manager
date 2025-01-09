import React, { useState } from "react";
import Header from "./layouts/common/Header";
import Footer from "./layouts/common/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./layouts/common/Home";
import PlayerList from "./layouts/players/PlayerList";
import PlayerPage from "./layouts/players/PlayerPage";
import TeamList from "./layouts/teams/TeamList";
import TeamPage from "./layouts/teams/TeamPage";
import Standings from "./layouts/standings/Standings";
import GamesList from "./layouts/games/GamesList";
import CreatePlayer from "./layouts/players/CreatePlayer";
import CreateTeam from "./layouts/teams/CreateTeam";
import AuthenticationGuard from "./auth/AuthenticationGuard";
import GamePage from "./layouts/games/GamePage";
import NotFound from "./layouts/common/NotFound";
import { useAuth0 } from "@auth0/auth0-react";
import SpinnerLoading from "./utils/SpinnerLoading";

export const App = () => {
  const [isHeaderBlocked, setIsHeaderBlocked] = useState(false);
  const { isLoading } = useAuth0();

  if (isLoading) return <SpinnerLoading />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header isBlocked={isHeaderBlocked}/>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/players" element={<PlayerList />} />
          <Route path="/players/:id" element={<PlayerPage />} />
          <Route path="/teams" element={<TeamList />} />
          <Route path="/teams/:id" element={<TeamPage />} />
          <Route path="/games" element={<GamesList setIsHeaderBlocked={setIsHeaderBlocked} />} />
          <Route path="/games/:id" element={<GamePage />} />

          {/* Protected routes */}
          <Route
            path="create-player"
            element={<AuthenticationGuard component={CreatePlayer} />}
          />
          <Route
            path="create-team"
            element={<AuthenticationGuard component={CreateTeam} />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
