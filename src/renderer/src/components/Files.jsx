import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import routes from "../constants/routes";
import { FILE_PROTOCOL } from "../../../shared/fileProtocol";
import ProgressBar from "./ProgressBar";
import Breadcrumbs from "./Breadcrumbs";
import FinalScreen from "./FinalScreen";
import classNames from "classnames";
import UndoIcon from "./Icons/UndoIcon";

const Files = () => {
   const [images, setImages] = useState([]);
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [filesToBeDeleted, setFilesToBeDeleted] = useState([]);
   const [showFinalScreen, setShowFinalScreen] = useState(false);

   const [searchParams] = useSearchParams();

   const getFilesForPath = async () => {
      const files = await window.api.getAllImageFileNames(searchParams.get("path"));
      setImages(files.filter(filename => filename !== ".DS_Store"));
   };

   const getFullPath = filename => `${searchParams.get("path")}/${filename}`;

   const handlePassImage = () => {
      console.info(getFullPath(images[currentImageIndex]));
      setFilesToBeDeleted(prev => [...prev, getFullPath(images[currentImageIndex])]);
      advance();
   };

   const handleSmashImage = () => advance();

   const handleUndo = () => {
      if (currentImageIndex === 0) return;

      setFilesToBeDeleted(prev => prev.slice(0, filesToBeDeleted.length - 1));
      setCurrentImageIndex(prev => prev - 1);
   };

   const advance = () => {
      if (isLastImage()) {
         setCurrentImageIndex(prev => prev + 1);
      } else {
         setShowFinalScreen(true);
      }
   };

   const isLastImage = () => currentImageIndex < images.length - 1;

   useEffect(() => {
      if (searchParams.get("path") === "") return undefined;

      getFilesForPath();
   }, []);

   return (
      <div className="h-screen">
         <header className="pt-5 px-5 w-full flex justify-between items-start sticky top-0">
            <Breadcrumbs currentPath={searchParams.get("path")} />
            <Link className="button accent text-sm px-3 py-1 font-normal" to={routes.index}>
               Open another directory
            </Link>
         </header>
         <div className="mt-12 w-full px-5 pb-5 flex flex-col justify-center items-center">
            {images.length > 0 && currentImageIndex < images.length && !showFinalScreen && (
               <div className="space-y-5 w-full flex flex-col justify-between items-center">
                  <div className="w-[400px] h-[225px] md:w-[640px] md:h-[360px] lg:w-[768px] lg:h-[432px] relative">
                     <img
                        key={images[currentImageIndex]}
                        src={`${FILE_PROTOCOL}:///${searchParams.get("path")}/${images[currentImageIndex]}`}
                        className="absolute w-full h-full object-contain"
                     />
                  </div>
                  <div className="flex flex-row justify-between w-6/12 lg:w-4/12">
                     <button className="button danger px-12 py-4" onClick={handlePassImage}>
                        Delete
                     </button>
                     <button
                        className={classNames("px-8 py-2", {
                           hidden: currentImageIndex == 0,
                        })}
                        onClick={handleUndo}
                     >
                        <UndoIcon className="ml-3" />
                     </button>
                     <button className="button success px-12 py-4" onClick={handleSmashImage}>
                        keep
                     </button>
                  </div>
                  <ProgressBar current={currentImageIndex} total={images.length} />
                  <button
                     className="button accent my-8 px-8 py-3"
                     onClick={() => setShowFinalScreen(true)}
                  >
                     Finish
                  </button>
               </div>
            )}
            {showFinalScreen && <FinalScreen {...{ filesToBeDeleted }} />}
         </div>
      </div>
   );
};

export default Files;
