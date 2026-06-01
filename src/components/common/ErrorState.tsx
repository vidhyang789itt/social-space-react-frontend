import { ErrorBox } from "../../styles/Error.style";

export default function ErrorMessage({
  message,
  onClose,
}: {
  message: string;
  onClose?: () => void;
}) {
  if (!message) return null;

  return (
    <ErrorBox>
      {message}
      {onClose && (
        <span onClick={onClose} style={{ float: "right", cursor: "pointer" }}>
          ✕
        </span>
      )}
    </ErrorBox>
  );
}
