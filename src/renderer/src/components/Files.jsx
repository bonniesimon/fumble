import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import routes from "../constants/routes";
import { FILE_PROTOCOL } from "../../../shared/fileProtocol";

const Files = () => {
   const [searchParams] = useSearchParams();
   const [images, setImages] = useState([]);
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [filesToBeDeleted, setFilesToBeDeleted] = useState([]);
   const [showFinalScreen, setShowFinalScreen] = useState(false);
   const [deletionInProgress, setDeletionInProgress] = useState(false);

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
      navigate(routes.index);
   };

   useEffect(() => {
      if (searchParams.get("path") === "") return undefined;

      getFilesForPath();
   }, []);

   return (
      <>
         <Link to={routes.index}>Open another directory</Link>
         <div>{searchParams.get("path")}</div>
         {images.length > 0 && currentImageIndex < images.length && !showFinalScreen && (
            <>
               <img
                  className="image"
                  key={images[currentImageIndex]}
                  src={`${FILE_PROTOCOL}:///${searchParams.get("path")}/${images[currentImageIndex]}`}
               />
               <div className="flex flex-row justify-between">
                  <button onClick={handlePassImage}>Pass</button>
                  <button onClick={handleSmashImage}>Smash</button>
               </div>
            </>
         )}
         {showFinalScreen && (
            <div className="flex flex-col">
               <p>Files to be deleted:</p>
               {filesToBeDeleted.map(filename => (
                  <li key={filename}>{filename}</li>
               ))}
               <div className="flex flex-col justify-center">
                  <p>Are you sure you want to delete all the above images?</p>
                  <button onClick={handleBulkDeletion}>Confirm deletion</button>
               </div>
               {deletionInProgress && <p>Deleting files....</p>}
            </div>
         )}
      </>
   );
};

export default Files;
