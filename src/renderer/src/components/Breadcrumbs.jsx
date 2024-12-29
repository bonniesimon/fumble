import React from "react";

import FolderIcon from "./Icons/FolderIcon";

const Breadcrumbs = ({ currentPath }) => {
   const path = currentPath.split("/").filter(Boolean);

   return (
      <div className="space-y-2">
         <div className="flex items-center space-x-2 rounded-lg p-2 text-sm text-lavender">
            <FolderIcon className="fill-current text-lavender" />
            <span className="text-lavender">/</span>
            {path.length > 3 ? (
               <>
                  <span className="text-lavender">{path[0]}</span>
                  <span className="text-lavender">/</span>
                  <div className="flex items-center text-lavender">...</div>
                  {path.slice(-2).map((item, index) => (
                     <React.Fragment key={item}>
                        <span className="text-lavender">/</span>
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
                     {index > 0 && <span className="text-lavender">/</span>}
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
