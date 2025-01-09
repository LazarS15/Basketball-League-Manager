import axios from "axios";
import sha1 from "js-sha1";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const handleUploadImage = async (file, uploadPresetType) => {
  let upload_preset;
  if (uploadPresetType === "player") {
    upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_PLAYERS;
  } else if (uploadPresetType === "logo") {
    upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_LOGOS;
  } else if (uploadPresetType === "team_images") {
    upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_TEAM_IMAGES;
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset); 
  data.append("cloud_name", cloudName); 

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      data
    );
    return {
      secure_url: response.data.secure_url,
      public_id: response.data.public_id,
    };
  } catch (error) {
    throw new Error("Image upload failed: " + (error.response?.data?.message || error.message));
  }
};


export const handleDeleteImage = async (publicId) => {
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  const data = new FormData();
  data.append("public_id", publicId); 
  data.append("api_key", apiKey); 
  data.append("timestamp", Math.floor(Date.now() / 1000).toString()); 

  const toSign = `public_id=${publicId}&timestamp=${data.get(
    "timestamp"
  )}${apiSecret}`;
  const signature = sha1(toSign); 

  data.append("signature", signature);

  try {
    const response = await axios.post(url, data);
    if (response.data.result === "ok") {
      return "Image deleted successfully";
    } else {
      throw new Error("Image deletion failed");
    }
  } catch (error) {
    throw new Error("Error deleting image: " + error.message);
  }
};
