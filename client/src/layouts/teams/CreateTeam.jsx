import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createTeamRequest } from "../../api/createApi";
import {
  handleDeleteImage,
  handleUploadImage,
} from "../../utils/imagesHandler";
import SpinnerLoading from "../../utils/SpinnerLoading";
import showToast from "../../utils/Toast";

const CreateTeam = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [teamData, setTeamData] = useState({
    name: "",
    imagePath: "",
    logoPath: "",
    hall: "",
  });
  const [files, setFiles] = useState({ imageFile: null, logoFile: null });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setTeamData((prev) => ({ ...prev, [name]: value }));

  const handleFileChange = ({ target: { files } }, field) => {
    setFiles((prev) => ({ ...prev, [field]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let image;
    let logo;
    try {
      setIsLoading(true);
      const token = await getAccessTokenSilently();

      image = await handleUploadImage(files.imageFile, "team_images");
      logo = await handleUploadImage(files.logoFile, "logo");

      await createTeamRequest(
        { ...teamData, imagePath: image.secure_url, logoPath: logo.secure_url },
        token
      );

      setTeamData({ name: "", imagePath: "", logoPath: "", hall: "" });
      setFiles({ imageFile: null, logoFile: null });
      showToast("Team is created!", "success");
    } catch (error) {
      handleDeleteImage(image.public_id);
      handleDeleteImage(logo.public_id);
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg border">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Create New Team
      </h1>
      <h2 className="text-md font-bold text-red-600 mb-6">
        * Each team must have a minimum of 6 players
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {["name", "hall"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={`Enter team ${field}`}
            value={teamData[field]}
            onChange={handleChange}
            required
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        ))}
        {["imageFile", "logoFile"].map((field) => (
          <div key={field} className="w-full">
            <label className="block text-gray-600 font-medium mb-2">
              Upload {field == "imageFile" ? "team image" : "logo"}
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, field)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-200 font-medium"
        >
          Create Team
        </button>
      </form>
    </div>
  );
};

export default CreateTeam;
