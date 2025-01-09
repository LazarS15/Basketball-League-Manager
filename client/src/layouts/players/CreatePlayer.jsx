import React, { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createPlayerRequest, getTeams } from "../../api/createApi";
import { handleDeleteImage, handleUploadImage } from "../../utils/imagesHandler";
import SpinnerLoading from "../../utils/SpinnerLoading";
import showToast from "../../utils/Toast";

const CreatePlayer = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [playerData, setPlayerData] = useState({
    firstName: "",
    lastName: "",
    jerseyNumber: 0,
    teamName: "",
    imagePath: "",
    birthDate: "",
  });
  const [teams, setTeams] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const teamsResult = await getTeams();
        setTeams(teamsResult);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const handleChange = ({ target: { name, value } }) =>
    setPlayerData((prev) => ({
      ...prev,
      [name]: name === "jerseyNumber" ? +value || 0 : value,
    }));

  const handleFileChange = ({ target: { files } }) => setImageFile(files[0]);

  const handleSubmit = async (e) => {
    let image;
    try {
      setIsLoading(true);
      e.preventDefault();

      const token = await getAccessTokenSilently();
      image = await handleUploadImage(imageFile, "player");
      await createPlayerRequest(
        { ...playerData, imagePath: image.secure_url },
        token
      );

      setPlayerData({
        firstName: "",
        lastName: "",
        jerseyNumber: 0,
        teamName: "",
        imagePath: "",
        birthDate: "",
      });
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      showToast("Player created successfully", "success");
    } catch (error) {
      handleDeleteImage(image.public_id);
      showToast("Failed to create player: " + error.message, "error");
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  if (isLoading) return <SpinnerLoading />;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg border">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Create New Player
      </h1>
      <h2 className="text-md font-bold text-red-600 mb-6">
        * Each team must have a minimum of 6 players
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {["firstName", "lastName", "birthDate"].map((field) => (
          <input
            key={field}
            type={field === "birthDate" ? "date" : "text"}
            name={field}
            placeholder={`Enter ${field}`}
            value={playerData[field]}
            onChange={handleChange}
            required
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        ))}
        <input
          type="number"
          name="jerseyNumber"
          placeholder="Enter jersey number"
          value={playerData.jerseyNumber}
          onChange={handleChange}
          min="0"
          max="99"
          required
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <select
          name="teamName"
          value={playerData.teamName}
          onChange={handleChange}
          required
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="" disabled>
            Select a team
          </option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
        <div className="w-full">
          <label className="block text-gray-600 font-medium mb-2">
            Upload players image
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-200 font-medium"
        >
          Create Player
        </button>
      </form>
    </div>
  );
};

export default CreatePlayer;
