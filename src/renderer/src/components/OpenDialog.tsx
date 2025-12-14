import { useNavigate, useSearchParams } from "react-router-dom";

import routes from "../constants/routes";
import Toast from "./Toast";

type ToastStatus = "success" | "error" | "warning";

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
   const noticeKind = (searchParams.get("notice-kind") || "success") as ToastStatus;

   return (
      <>
         <div className="w-full flex flex-col justify-center items-center h-screen">
            <button className="button" onClick={openDialog}>
               Open directory
            </button>
         </div>
         {isShowNoticeToast && (
            <Toast
               status={noticeKind}
               message={searchParams.get("notice") || ""}
               onClose={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete("notice");
                  newParams.delete("notice-kind");
                  setSearchParams(newParams);
               }}
            />
         )}
      </>
   );
};

export default OpenDialog;
