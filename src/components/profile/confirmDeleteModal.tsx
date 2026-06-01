import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`;

const ModalCard = styled.div`
  background: white;
  width: 400px;
  max-width: 90%;
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  padding: 8px 18px;
  border-radius: 999px;
  border: none;
  background: #eeeeee;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 8px 18px;
  border-radius: 999px;
  border: none;
  background: #ef4444;
  color: white;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;

export const ConfirmDeleteModal = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Overlay onClick={onCancel}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <h3>Are you sure?</h3>
        <p style={{ marginTop: "10px", color: "#555" }}>
          Do you really want to delete this post?
        </p>

        <ButtonRow>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <DeleteButton onClick={onConfirm}>Delete</DeleteButton>
        </ButtonRow>
      </ModalCard>
    </Overlay>
  );
};
