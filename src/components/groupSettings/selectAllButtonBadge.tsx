import React from "react";

interface SelectAllButtonProps {
  totalUsers: number;
  selectedCount: number;
  isLoading?: boolean;
  onSelectAll: () => void;
}

export const SelectAllButton: React.FC<SelectAllButtonProps> = ({
  totalUsers,
  selectedCount,
  isLoading,
  onSelectAll,
}) => {
  if (totalUsers <= 1) return null;

  return (
    <button
      onClick={onSelectAll}
      disabled={isLoading}
      type="button"
      style={{
        background: "none",
        border: "none",
        color: "#8b5cf6",
        cursor: "pointer",
        fontSize: "0.875rem",
        fontWeight: "500",
        marginBottom: "1rem",
        padding: "0.5rem",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "#7c3aed";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "#8b5cf6";
      }}
    >
      {selectedCount === totalUsers ? "Deselect All" : "Select All"}
    </button>
  );
};