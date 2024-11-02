import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import routes from "../constants/routes";
import { FILE_PROTOCOL } from "../../../shared/fileProtocol";

const Files = () => {
   const [images, setImages] = useState([]);
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [filesToBeDeleted, setFilesToBeDeleted] = useState([]);
   const [showFinalScreen, setShowFinalScreen] = useState(false);
   const [deletionInProgress, setDeletionInProgress] = useState(false);

   const [searchParams] = useSearchParams();
   const navigate = useNavigate();

   const getFilesForPath = async () => {
      const files = await window.api.getAllImageFileNames(searchParams.get("path"));
      setImages(files.filter(filename => filename !== ".DS_Store"));
   };

   const getFullPath = filename => `${searchParams.get("path")}/${filename}`;

   const handlePassImage = () => {
      console.log(getFullPath(images[currentImageIndex]));
      setFilesToBeDeleted(prev => [...prev, getFullPath(images[currentImageIndex])]);
      advance();
   };

   const handleSmashImage = () => advance();

   const advance = () => {
      if (isLastImage()) {
         setCurrentImageIndex(prev => prev + 1);
      } else {
         setShowFinalScreen(true);
      }
   };

   const isLastImage = () => currentImageIndex < images.length - 1;

   const handleBulkDeletion = async () => {
      setDeletionInProgress(true);
      await window.api.fakeBulkDeleteFiles(filesToBeDeleted);
      setDeletionInProgress(false);
      navigate(routes.index + `?notice=${encodeURIComponent("Deleted files successfully")}`);
   };

   useEffect(() => {
      if (searchParams.get("path") === "") return undefined;

      getFilesForPath();
   }, []);

   return (
      <div className="w-full h-screen px-5 py-5 flex flex-col justify-center items-center">
         {images.length > 0 && currentImageIndex < images.length && !showFinalScreen && (
            <div className="space-y-5 w-full flex flex-col justify-between items-center">
               <div className="">
                  <img
                     className="image w-[1280] h-[720]"
                     key={images[currentImageIndex]}
                     src={`${FILE_PROTOCOL}:///${searchParams.get("path")}/${images[currentImageIndex]}`}
                  />
               </div>
               <div className="flex flex-row justify-between w-4/12">
                  <button className="button danger px-12 py-4" onClick={handlePassImage}>
                     Delete
                  </button>
                  <button className="button success px-12 py-4" onClick={handleSmashImage}>
                     keep
                  </button>
               </div>
            </div>
         )}
         {showFinalScreen && (
            <div className="flex flex-col">
               <p>Files to be deleted:</p>
               {filesToBeDeleted.map(filename => (
                  <li key={filename}>{filename}</li>
               ))}
               <div className="flex flex-col justify-center">
                  <p>Are you sure you want to delete all the above images?</p>
                  <button className="button success w-fit mx-auto" onClick={handleBulkDeletion}>
                     Confirm deletion
                  </button>
               </div>
               {deletionInProgress && <p>Deleting files....</p>}
            </div>
         )}
         <footer className="mt-12 mb-4 w-full flex flex-col justify-center space-y-5">
            <p className="w-fit mx-auto">Current folder: {searchParams.get("path")}</p>
            <Link className="button accent mx-auto" to={routes.index}>
               Open another directory
            </Link>
         </footer>
      </div>
   );
};

export default Files;
