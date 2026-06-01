import { useState } from "react";

interface PostFormFields {
  initialTitle: string;
  initialContent: string;
  onSubmit: (title: string, content: string, mediaFiles?: File[]) => Promise<void>;
}

interface MediaPreview {
  file: File;
  preview: string;
  type: "image" | "video";
}

export const usePostForm = ({
  initialTitle,
  initialContent,
  onSubmit,
}: PostFormFields) => {
  const [title, setTitle] = useState<string>(initialTitle || "");
  const [content, setContent] = useState<string>(initialContent || "");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreview, setMediaPreview] = useState<MediaPreview[]>([]);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

    for (const file of newFiles) {
      const isImage = allowedImageTypes.includes(file.type);
      const isVideo = allowedVideoTypes.includes(file.type);

      if (!isImage && !isVideo) {
        setError(`File ${file.name} is not supported`);
        return;
      }

      const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setError(`File ${file.name} is too large`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = event.target?.result as string;
        const type = isImage ? "image" : "video";

        setMediaPreview((prev) => [...prev, { file, preview, type }]);
        setMediaFiles((prev) => [...prev, file]);
      };

      reader.readAsDataURL(file);
    }
  };

  const removeMedia = (index: number) => {
    setMediaPreview((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (prev[index]?.preview) {
        URL.revokeObjectURL(prev[index].preview);
      }
      return updated;
    });

    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateAndSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const trimmedTitle = String(title).trim();
    const trimmedContent = String(content).trim();

    if (!trimmedTitle) {
      setError("Title is required");
      return;
    }

    if (trimmedTitle.length > 120) {
      setError("Title must be 120 characters or less");
      return;
    }

    if (!trimmedContent) {
      setError("Content is required");
      return;
    }

    if (trimmedContent.length > 5000) {
      setError("Content must be 5000 characters or less");
      return;
    }

    setError("");
    
    try {

      await onSubmit(
        trimmedTitle,
        trimmedContent,
        mediaFiles.length > 0 ? mediaFiles : undefined,
      );
    } catch (err) {
      console.error("Submit error:", err);
      setError(err instanceof Error ? err.message : "Failed to submit post");
      throw err;
    }
  };

  const clearAllMedia = () => {
    mediaPreview.forEach((media) => {
      if (media.preview) {
        URL.revokeObjectURL(media.preview);
      }
    });
    setMediaPreview([]);
    setMediaFiles([]);
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    mediaFiles,
    mediaPreview,
    error,
    setError,
    handleFileChange,
    removeMedia,
    clearAllMedia,
    validateAndSubmit,
  };
};