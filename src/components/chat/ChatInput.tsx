import React from "react";
import { Upload, Loader } from "lucide-react";
import * as S from "../../styles/chat.styles";

interface ChatInputProps {
  text: string;
  isUploading: boolean;
  mediaFiles: File[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>; 
  onTextChange: (text: string) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  text,
  isUploading,
  mediaFiles,
  fileInputRef,
  inputRef,
  onTextChange,
  onFileSelect,
  onSend,
}) => {
  return (
    <S.InputContainer onSubmit={onSend}>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        style={{
          background: "none",
          border: "none",
          cursor: isUploading ? "not-allowed" : "pointer",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          color: "#64748b",
          opacity: isUploading ? 0.5 : 1,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          if (!isUploading) {
            (e.currentTarget as HTMLButtonElement).style.color = "#8b5cf6";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
        }}
      >
        {isUploading ? (
          <Loader
            size={20}
            style={{ animation: "spin 1s linear infinite" }}
          />
        ) : (
          <Upload size={20} />
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={onFileSelect}
        disabled={isUploading}
        style={{ display: "none" }}
        accept="image/*,video/*,.pdf,.doc,.docx"
      />

      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Type a message..."
        autoComplete="off"
        disabled={isUploading}
        style={{
          flex: 1,
          border: "none",
          background: "transparent",
          outline: "none",
          color: "#1f2937",
          fontSize: "14px",
        }}
      />

      <button
        type="submit"
        disabled={(!text.trim() && mediaFiles.length === 0) || isUploading}
        style={{
          background: "none",
          border: "none",
          cursor:
            !text.trim() && mediaFiles.length === 0
              ? "not-allowed"
              : "pointer",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          color:
            !text.trim() && mediaFiles.length === 0
              ? "#cbd5e1"
              : "#8b5cf6",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          if (text.trim() || mediaFiles.length > 0) {
            (e.currentTarget as HTMLButtonElement).style.color = "#7c3aed";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#8b5cf6";
        }}
      >
        {isUploading ? (
          <Loader
            size={20}
            style={{ animation: "spin 1s linear infinite" }}
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            width="20"
            height="20"
            style={{ transform: "rotate(90deg)" }}
          >
            <path d="M3.4,20.2,21,12,3.4,3.8V9.5L14.5,12,3.4,14.5Z" />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </S.InputContainer>
  );
};

export default ChatInput;