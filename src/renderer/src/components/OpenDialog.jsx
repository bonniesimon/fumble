import { useNavigate, useSearchParams } from "react-router-dom";

import routes from "../constants/routes";
import Toast from "./Toast";

const OpenDialog = () => {
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams();

   const openDialog = async () => {
      const path = await window.api.openFile();
      if (path === undefined) {
         return navigate(routes.index);
      }

      navigate(`/files?path=${encodeURIComponent(path)}`);
   };

   const isShowNoticeToast = searchParams.get("notice") && searchParams.get("notice") !== "";

   return (
      <>
         <div className="w-full flex flex-col justify-center items-center h-screen">
            <button className="button" onClick={openDialog}>
               Open directory
            </button>
         </div>
         {isShowNoticeToast && (
            <Toast
               status={searchParams.get("notice-kind") || "success"}
               message={searchParams.get("notice")}
               onClose={() => setSearchParams(curr => curr.delete("notice"))}
            />
         )}
      </>
   );
};

export default OpenDialog;
