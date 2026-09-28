import React from "react";

import { PATH_SEPARATOR, splitPath } from "../utils/path";
import FolderIcon from "./Icons/FolderIcon";

interface BreadcrumbsProps {
   currentPath: string;
}

const Breadcrumbs = ({ currentPath }: BreadcrumbsProps) => {
   const path = splitPath(currentPath);
   // POSIX paths start at "/"; Windows paths start at a drive like "C:"
   const isRootedAtSeparator = currentPath.startsWith("/");

   return (
      <div className="space-y-2">
         <div className="flex items-center space-x-2 rounded-lg p-2 text-sm text-lavender">
            <FolderIcon className="fill-current text-lavender" />
            {isRootedAtSeparator && <span className="text-lavender">/</span>}
            {path.length > 3 ? (
               <>
                  <span className="text-lavender">{path[0]}</span>
                  <span className="text-lavender">{PATH_SEPARATOR}</span>
                  <div className="flex items-center text-lavender">...</div>
                  {path.slice(-2).map((item, index) => (
                     <React.Fragment key={item}>
                        <span className="text-lavender">{PATH_SEPARATOR}</span>
                        <span
                           className={`${
                              index === 1 ? "text-lavender font-medium" : "text-lavender"
                           }`}
                        >
                           {item}
                        </span>
                     </React.Fragment>
                  ))}
               </>
            ) : (
               path.map((item, index) => (
                  <React.Fragment key={item}>
                     {index > 0 && <span className="text-lavender">{PATH_SEPARATOR}</span>}
                     <span
                        className={`${
                           index === path.length - 1 ? "text-lavender font-medium" : "text-lavender"
                        }`}
                     >
                        {item}
                     </span>
                  </React.Fragment>
               ))
            )}
         </div>
      </div>
   );
};

export default Breadcrumbs;
