import React from "react";
import { Check, Loader } from "lucide-react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;

  button {
    flex: 1;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &.primary {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
      box-shadow: 0 4px 6px rgba(139, 92, 246, 0.3);

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(139, 92, 246, 0.4);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }
    }

    &.secondary {
      background: white;
      color: #374151;
      border: 2px solid #e5e7eb;

      &:hover:not(:disabled) {
        background: #f3f4f6;
        border-color: #9ca3af;
      }

      &:active:not(:disabled) {
        background: #e5e7eb;
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
  }
`;

interface UserActionsProps {
  primaryText: string;
  secondaryText?: string;
  selectedCount: number;
  isLoading?: boolean;
  onPrimary: () => void;
  onSecondary?: () => void;
  primaryDisabled?: boolean;
}

export const UserActions: React.FC<UserActionsProps> = ({
  primaryText,
  secondaryText = "Cancel",
  selectedCount,
  isLoading,
  onPrimary,
  onSecondary,
  primaryDisabled = false,
}) => {
  return (
    <Container>
      {onSecondary && (
        <button
          className="secondary"
          onClick={onSecondary}
          disabled={isLoading}
          type="button"
        >
          {secondaryText}
        </button>
      )}
      <button
        className="primary"
        onClick={onPrimary}
        disabled={isLoading || primaryDisabled || selectedCount === 0}
        type="button"
      >
        {isLoading ? (
          <>
            <Loader
              size={16}
              style={{ animation: "spin 1s linear infinite" }}
            />
            {primaryText.split(" ")[0]}...
          </>
        ) : (
          <>
            <Check size={16} />
            {primaryText} {selectedCount > 0 && `(${selectedCount})`}
          </>
        )}
      </button>
    </Container>
  );
};