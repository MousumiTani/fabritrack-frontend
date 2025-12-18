import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const base = "rounded-lg font-medium transition-all duration-200";

  const variants = {
    primary: "bg-[#d3b89a] text-[#5f4631] hover:bg-[#FFC49B]",
    secondary: "bg-[#FFD9B3] text-[#8B5E3C] hover:bg-[#FFC49B]",
    outline:
      "border border-[#8B5E3C] text-[#8B5E3C] hover:bg-[#FFD9B3] hover:text-[#8B5E3C]",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    full: "px-4 py-2 w-full text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
