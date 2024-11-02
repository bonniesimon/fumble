import { useNavigate } from "react-router-dom";

const OpenDialog = () => {
   const navigate = useNavigate();

   const openDialog = async () => {
      const path = await window.api.openFile();
      navigate(`/files?path=${encodeURIComponent(path)}`);
   };

   return (
      <div className="action">
         <button onClick={openDialog}>Open directory</button>
      </div>
   );
};

export default OpenDialog;
