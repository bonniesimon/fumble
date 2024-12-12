const UndoIcon = ({ size = 24, color = "#5F65D4", className = "", ariaLabel = "Undo action" }) => {
   return (
      <svg
         width={size}
         height={size}
         viewBox="0 0 24 24"
         fill="none"
         stroke={color}
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         className={`transition-colors duration-200 ${className}`}
         aria-label={ariaLabel}
         role="img"
      >
         <path d="M3 7v6h6" />
         <path d="M3 13c0-4.97 4.03-9 9-9 4.97 0 9 4.03 9 9s-4.03 9-9 9c-2.49 0-4.74-1.01-6.36-2.64" />
      </svg>
   );
};

export default UndoIcon;
