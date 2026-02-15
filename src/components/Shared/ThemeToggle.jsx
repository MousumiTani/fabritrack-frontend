import React from "react";

const ThemeToggle = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      className="toggle toggle-sm bg-amber-50"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};

export default ThemeToggle;
