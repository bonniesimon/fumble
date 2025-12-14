interface SpinnerProps {
   size?: "sm" | "md" | "lg";
}

const Spinner = ({ size = "md" }: SpinnerProps) => {
   const sizes = {
      sm: "w-4 h-4 border-2",
      md: "w-8 h-8 border-3",
      lg: "w-12 h-12 border-4",
   };

   return (
      <div className="flex justify-center items-center">
         <div
            className={`
          ${sizes[size]}
          border-gray-200
          border-t-[#5F65D4]
          rounded-full
          animate-spin
        `}
         />
      </div>
   );
};

export default Spinner;
