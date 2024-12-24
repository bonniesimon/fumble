import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "./Spinner";
import { FILE_PROTOCOL } from "../../../shared/fileProtocol";
import routes from "../constants/routes";

const FinalScreen = ({ filesToBeDeleted }) => {
   const [deletionInProgress, setDeletionInProgress] = useState(false);
   const [unselectedImages, setUnselectedImages] = useState([]);

   const navigate = useNavigate();

   const handleBulkDeletion = async () => {
      setDeletionInProgress(true);

      const actualFilesToBeDeleted = filesToBeDeleted.filter(
         file => !unselectedImages.includes(file)
      );

      if (actualFilesToBeDeleted.length === 0) {
         return handleNoFilesToBeDeleted();
      }

      await window.api.fakeBulkDeleteFiles(actualFilesToBeDeleted);

      setDeletionInProgress(false);

      navigate(routes.index + `?notice=${encodeURIComponent("Deleted files successfully")}`);
   };

   const handleCheckboxChange = (e, imagePath) => {
      if (e.target.checked) {
         setUnselectedImages(prev => prev.filter(imgPath => imgPath !== imagePath));

         return;
      }

      setUnselectedImages(prev => [...prev, imagePath]);
   };

   const handleNoFilesToBeDeleted = () => {
      navigate(
         routes.index +
            `?notice=${encodeURIComponent("No files selected to be deleted")}&notice-kind=warning`
      );
   };

   useEffect(() => {
      if (filesToBeDeleted.length > 0) return;

      handleNoFilesToBeDeleted();
   }, [filesToBeDeleted]);

   return (
      <div className="flex flex-col justify-center w-7/12 mx-auto space-y-14 h-full">
         <p className="font-semibold text-center">
            Are you sure you want to delete the following images?
         </p>
         <div className="overflow-y-auto flex flex-wrap max-h-96 content-around relative">
            {deletionInProgress && (
               <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                  <Spinner size="lg" />
               </div>
            )}
            {filesToBeDeleted.map(image => (
               <div key={image} className="h-[96px] mx-2 my-2">
                  <input
                     type="checkbox"
                     checked={!unselectedImages.includes(image)}
                     onChange={e => handleCheckboxChange(e, image)}
                  />
                  <img
                     src={`${FILE_PROTOCOL}:///${image}`}
                     className="w-full h-full object-contain"
                  />
               </div>
            ))}
         </div>
         <div className="flex justify-between w-6/12 mx-auto">
            <button
               className="button danger"
               onClick={() =>
                  navigate(
                     routes.index +
                        `?notice=${encodeURIComponent("Aborted deletion")}&notice-kind=error`
                  )
               }
            >
               Cancel
            </button>
            <button className="button success" onClick={handleBulkDeletion}>
               Confirm
            </button>
         </div>
      </div>
   );
};

export default FinalScreen;
