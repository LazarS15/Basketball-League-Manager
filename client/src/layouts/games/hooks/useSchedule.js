import { useState, useEffect } from "react";
import { checkSchedule, createSchedule } from "../../../api/gamesApi";
import { useAuth0 } from "@auth0/auth0-react";

export const useSchedule = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isScheduled, setIsScheduled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCheckSchedule = async () => {
      try {
        if (!isAuthenticated) {
          return;
        }
        const token = await getAccessTokenSilently();
        const isScheduledResponse = await checkSchedule(token);
        setIsScheduled(isScheduledResponse);
      } catch (err) {
        console.error("Error checking schedule:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheckSchedule();
  }, [isAuthenticated]);

  const handleSchedule = async (fetchGames, fetchTotalPages, setIsHeaderBlocked) => {
    try {
      setIsHeaderBlocked(true);
      setIsLoading(true);
      const token = await getAccessTokenSilently();
      await createSchedule(token);
      await fetchGames()
      await fetchTotalPages();
      setIsScheduled(true);
      setIsHeaderBlocked(false);
    } catch (err) {
      console.error("Error scheduling games:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isScheduled, isLoading, handleSchedule };
};
