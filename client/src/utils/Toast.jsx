import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (message, type) => {
  const options = {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case "error":
      toast.error(message, options);
      break;
    case "success":
      toast.success(message, options);
      break;
    default:
      toast.info(message, options);
  }
};

export default showToast;
