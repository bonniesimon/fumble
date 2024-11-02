import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Toast = ({ message, onClose }) => {
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
         className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded shadow-md transition-opacity duration-500 ${
            visible ? "opacity-100" : "opacity-0"
         }`}
      >
         <div className="flex flex-row">
            <p>{message}</p>
            <button onClick={onClose}>X</button>
         </div>
      </div>
   );
};

export default Toast;
