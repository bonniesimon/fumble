import { useEffect, useState } from "react";

const COLOR_STATUS_MAP = {
   success: "bg-emerald",
   error: "bg-persian-red-500",
   warning: "bg-amber-400",
};

const Toast = ({ message, onClose, status = "success" }) => {
   const [visible, setVisible] = useState(true);

   useEffect(() => {
      const fadeOutTimer = setTimeout(() => setVisible(false), 2500); // Start fading out after 2.5 seconds
      const closeTimer = setTimeout(onClose, 3000); // Fully hide after 3 seconds

      return () => {
         clearTimeout(fadeOutTimer);
         clearTimeout(closeTimer);
      };
   }, [onClose]);

   return (
      <div
         className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 rounded shadow-md transition-opacity duration-500 ${
            visible ? "opacity-100" : "opacity-0"
         }`}
      >
         <div
            className={`flex flex-row text-white py-2 px-4 space-x-5 ${COLOR_STATUS_MAP[status]} text-raisin-black-500 rounded-lg`}
         >
            <p>{message}</p>
            <button className="hover:text-poppy" onClick={onClose}>
               X
            </button>
         </div>
      </div>
   );
};

export default Toast;
