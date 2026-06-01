import React from "react";
import { Users } from "lucide-react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%);
  border-radius: 8px;
  border: 1px solid #e9d5ff;

  .count-text {
    font-size: 0.875rem;
    color: #6b21a8;
    font-weight: 500;
  }

  .count-badge {
    background: #8b5cf6;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 700;
  }
`;

interface SelectedCountBadgeProps {
  count: number;
}

export const SelectedCountBadge: React.FC<SelectedCountBadgeProps> = ({
  count,
}) => {
  if (count === 0) return null;

  return (
    <Container>
      <Users size={16} />
      <span className="count-text">
        {count} user{count !== 1 ? "s" : ""} selected
      </span>
      <span className="count-badge">{count}</span>
    </Container>
  );
};