const ProgressBar = ({ current = 3, total = 10 }) => {
   const percentage = Math.round((current / total) * 100);

   return (
      <div className="w-full max-w-md">
         <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-lavender">Progress</span>
            <span className="text-sm font-medium text-lavender">
               {current} of {total} ({percentage}%)
            </span>
         </div>

         <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
               className="bg-savoy-blue-500 h-2.5 rounded-full transition-all duration-300"
               style={{ width: `${percentage}%` }}
            />
         </div>
      </div>
   );
};

export default ProgressBar;
