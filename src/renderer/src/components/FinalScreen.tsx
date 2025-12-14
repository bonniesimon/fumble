import classNames from "classnames";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FILE_PROTOCOL } from "../../../shared/fileProtocol";
import routes from "../constants/routes";
import Spinner from "./Spinner";

interface FinalScreenProps {
   filesToBeDeleted: string[];
}

const FinalScreen = ({ filesToBeDeleted }: FinalScreenProps) => {
   const [deletionInProgress, setDeletionInProgress] = useState(false);
   const [unselectedImages, setUnselectedImages] = useState<string[]>([]);
   const navigate = useNavigate();

   const handleBulkDeletion = async () => {
      setDeletionInProgress(true);
      const actualFilesToBeDeleted = filesToBeDeleted.filter(
         file => !unselectedImages.includes(file)
      );
      if (actualFilesToBeDeleted.length === 0) {
         return handleNoFilesToBeDeleted();
      }
      await window.api.bulkDeleteFiles(actualFilesToBeDeleted);
      setDeletionInProgress(false);
      navigate(routes.index + `?notice=${encodeURIComponent("Deleted files successfully")}`);
   };

   const toggleImageSelection = (imagePath: string) => {
      setUnselectedImages(prev =>
         prev.includes(imagePath) ? prev.filter(path => path !== imagePath) : [...prev, imagePath]
      );
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
      <div className="flex flex-col justify-center w-7/12 mx-auto space-y-8 h-full">
         <p className="text-lg font-semibold text-center">Select the images you want to delete</p>
         <div className="overflow-y-auto grid grid-cols-3 gap-4 max-h-96 relative p-4">
            {deletionInProgress && (
               <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                  <Spinner size="lg" />
               </div>
            )}
            {filesToBeDeleted.map(image => (
               <div
                  key={image}
                  className={classNames(
                     "relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-200",
                     {
                        "opacity-40 hover:opacity-60": unselectedImages.includes(image),
                        "ring-2 ring-blue-500 ring-offset-2": !unselectedImages.includes(image),
                     }
                  )}
                  onClick={() => toggleImageSelection(image)}
               >
                  <img
                     src={`${FILE_PROTOCOL}:///${image}`}
                     className="w-full h-48 object-cover"
                     alt="Selected file"
                  />
                  {!unselectedImages.includes(image) && (
                     <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                        <X className="w-4 h-4 text-white" />
                     </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 truncate">
                     {image.split("/").pop()}
                  </div>
               </div>
            ))}
         </div>
         <div className="flex justify-between w-6/12 mx-auto">
            <button
               className="button accent"
               onClick={() =>
                  navigate(
                     routes.index +
                        `?notice=${encodeURIComponent("Deletion cancelled")}&notice-kind=error`
                  )
               }
            >
               Cancel
            </button>
            <button className="button danger" onClick={handleBulkDeletion}>
               Delete ({filesToBeDeleted.length - unselectedImages.length})
            </button>
         </div>
      </div>
   );
};

export default FinalScreen;
