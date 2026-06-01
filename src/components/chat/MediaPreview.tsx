import React from "react";
import { X, FileText } from "lucide-react";

interface MediaPreviewProps {
  previews: Array<{ url: string; type: "image" | "video" | "file"; name: string }>;
  onRemove: (index: number) => void;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ previews, onRemove }) => {
  return (
    <div
      style={{
        padding: "12px",
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        background: "#f9fafb",
      }}
    >
      {previews.map((preview, idx) => (
        <div
          key={idx}
          style={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            width: "60px",
            height: "60px",
            border: "2px solid #8b5cf6",
          }}
        >
          {preview.type === "image" && (
            <img
              src={preview.url}
              alt={`Preview ${idx}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
          {preview.type === "video" && (
            <video
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source src={preview.url} type="video/mp4" />
            </video>
          )}
          {preview.type === "file" && (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#e5e7eb",
              }}
            >
              <FileText size={24} />
            </div>
          )}
          <button
            onClick={() => onRemove(idx)}
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              background: "#ef4444",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              padding: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#dc2626";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#ef4444";
            }}
          >
            <X size={12} color="white" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MediaPreview;