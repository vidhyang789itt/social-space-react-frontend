import React, { useRef, useState, useEffect } from "react";
import {
  FormWrapper,
  Input,
  TextArea,
  SubmitButton,
  CancelButton,
  FormHeader,
  FormContent,
  FormFooter,
  CharCount,
  TitleGroup,
  ContentGroup,
  HiddenFileInput,
} from "../../styles/PostForm.style";
import * as PS from "../../styles/preview.style";
import ErrorMessage from "../common/ErrorState";
import { usePostForm } from "../../hooks/useProfileForm";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface ExistingMedia {
  _id?: string;
  url: string;
  type: "image" | "video";
}

interface MediaPreview {
  file: File;
  preview: string;
  type: "image" | "video";
}

interface Props {
  initialTitle?: string;
  initialContent?: string;
  initialImage?: string;
  initialMedia?: ExistingMedia[];
  onSubmit: (title: string, content: string, mediaFiles?: File[]) => Promise<void>;
  loading?: boolean;
  isEdit?: boolean;
  onClose: () => void;
  onRemovedMedia?: (ids: string[]) => void;
  onExistingMediaChange?: (media: ExistingMedia[]) => void;
}

const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 5000;
const MAX_FILES = 10;

const FormAndPreviewWrapper = `
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const PostForm = ({
  initialTitle = "",
  initialContent = "",
  initialMedia = [],
  onSubmit,
  loading,
  isEdit = false,
  onClose,
  onRemovedMedia,
  onExistingMediaChange,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [imageError, setImageError] = useState("");
  const [existingMedia, setExistingMedia] = useState<ExistingMedia[]>(initialMedia || []);
  const [removedMediaIds, setRemovedMediaIds] = useState<string[]>([]);

  const {
    title,
    setTitle,
    content,
    setContent,
    mediaPreview,
    error,
    setError,
    handleFileChange,
    removeMedia,
    validateAndSubmit: baseValidateAndSubmit,
  } = usePostForm({
    initialTitle,
    initialContent,
    onSubmit,
  });

  useEffect(() => {
    if (initialMedia && initialMedia.length > 0) {
      setExistingMedia(initialMedia);
    }
  }, [initialMedia]);

  useEffect(() => {
    onRemovedMedia?.(removedMediaIds);
  }, [removedMediaIds, onRemovedMedia]);

  useEffect(() => {
    onExistingMediaChange?.(existingMedia);
  }, [existingMedia, onExistingMediaChange]);

  const titleLength = title.length;
  const contentLength = content.length;

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImageError("");

    if (!files) return;

    const newFiles = Array.from(files);
    const totalMediaCount = existingMedia.length + mediaPreview.length;

    if (totalMediaCount + newFiles.length > MAX_FILES) {
      setImageError(`Maximum ${MAX_FILES} files allowed total`);
      return;
    }

    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

    for (const file of newFiles) {
      const isImage = allowedImageTypes.includes(file.type);
      const isVideo = allowedVideoTypes.includes(file.type);

      if (!isImage && !isVideo) {
        setImageError(`File ${file.name} is not supported`);
        return;
      }

      const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setImageError(`File ${file.name} is too large`);
        return;
      }
    }

    handleFileChange(e);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    baseValidateAndSubmit(e);
  };

  const removeExistingMedia = (index: number) => {
    const mediaToRemove = existingMedia[index];
    if (mediaToRemove._id) {
      setRemovedMediaIds((prev) => [...prev, mediaToRemove._id!]);
    }
    setExistingMedia((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      return updated;
    });
  };

  const totalMediaCount = existingMedia.length + mediaPreview.length;
  const hasMedia = totalMediaCount > 0;

  const getCurrentMedia = () => {
    if (currentMediaIndex < existingMedia.length) {
      return {
        ...existingMedia[currentMediaIndex],
        isExisting: true,
      };
    } else {
      const previewIndex = currentMediaIndex - existingMedia.length;
      return {
        ...mediaPreview[previewIndex],
        isExisting: false,
      };
    }
  };

  const currentMedia = hasMedia ? getCurrentMedia() : null;

  return (
    <>
      <style>{`
        .form-preview-container {
          ${FormAndPreviewWrapper}
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="form-preview-container">
        <FormWrapper onSubmit={handleFormSubmit}>
          <FormHeader>
            <h2>{isEdit ? "Edit Post" : "Create Post"}</h2>
            <p>{isEdit ? "Update your post" : "Share with community"}</p>
          </FormHeader>

          <FormContent>
            {error && <ErrorMessage message={error} onClose={() => setError("")} />}
            {imageError && (
              <ErrorMessage message={imageError} onClose={() => setImageError("")} />
            )}

            <TitleGroup>
              <label>Title</label>
              <Input
                type="text"
                placeholder="Give your post a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, MAX_TITLE_LENGTH))}
                maxLength={MAX_TITLE_LENGTH}
              />
              <CharCount $isWarning={titleLength > MAX_TITLE_LENGTH * 0.9}>
                {titleLength} / {MAX_TITLE_LENGTH}
              </CharCount>
            </TitleGroup>

            <ContentGroup>
              <label>Content</label>
              <TextArea
                placeholder="Write your content..."
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, MAX_CONTENT_LENGTH))}
                maxLength={MAX_CONTENT_LENGTH}
              />
              <CharCount $isWarning={contentLength > MAX_CONTENT_LENGTH * 0.9}>
                {contentLength} / {MAX_CONTENT_LENGTH}
              </CharCount>
            </ContentGroup>
          </FormContent>

          <FormFooter>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SubmitButton disabled={loading || !title.trim()}>
              {loading ? (
                <>
                  <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>
                    ⟳
                  </span>
                  {isEdit ? "Updating..." : "Create"}
                </>
              ) : isEdit ? (
                "Update"
              ) : (
                "Create"
              )}
            </SubmitButton>
          </FormFooter>
        </FormWrapper>

        <PS.PreviewContainer>
          <PS.PreviewHeader>
            <h3>📱 Preview</h3>
          </PS.PreviewHeader>

          <PS.PreviewContent>
            {!title.trim() && !content.trim() && !hasMedia ? (
              <PS.EmptyImageState>
                <span>Start creating to see preview</span>
              </PS.EmptyImageState>
            ) : (
              <PS.PreviewPost>
                {title && <PS.PreviewTitle>{title}</PS.PreviewTitle>}

                <PS.PreviewBody>
                  {hasMedia && currentMedia && (
                    <PS.ImageGallery>
                      <PS.ImageSlideContainer>
                        {currentMedia.type === "image" ? (
                          <PS.ImageSlide
                            src={
                              currentMedia.isExisting
                                ? (currentMedia as ExistingMedia).url.startsWith("http") ||
                                  (currentMedia as ExistingMedia).url.startsWith("blob")
                                  ? (currentMedia as ExistingMedia).url
                                  : `${import.meta.env.VITE_BASE_URL}/${(currentMedia as ExistingMedia).url}`
                                : (currentMedia as MediaPreview).preview
                            }
                            alt="Post"
                          />
                        ) : (
                          <video
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            controls
                          >
                            <source
                              src={
                                currentMedia.isExisting
                                  ? (currentMedia as ExistingMedia).url.startsWith("http") ||
                                    (currentMedia as ExistingMedia).url.startsWith("blob")
                                    ? (currentMedia as ExistingMedia).url
                                    : `${import.meta.env.VITE_BASE_URL}/${(currentMedia as ExistingMedia).url}`
                                  : (currentMedia as MediaPreview).preview
                              }
                              type="video/mp4"
                            />
                          </video>
                        )}
                      </PS.ImageSlideContainer>
                      <PS.ImageNavigation>
                        <PS.ArrowButton
                          disabled={totalMediaCount <= 1}
                          onClick={() =>
                            setCurrentMediaIndex((prev) =>
                              prev === 0 ? totalMediaCount - 1 : prev - 1
                            )
                          }
                          type="button"
                        >
                          <ChevronLeft />
                        </PS.ArrowButton>
                        <PS.ImageCounter>
                          {currentMediaIndex + 1} / {totalMediaCount}
                        </PS.ImageCounter>
                        <PS.ArrowButton
                          disabled={totalMediaCount <= 1}
                          onClick={() =>
                            setCurrentMediaIndex((prev) =>
                              prev === totalMediaCount - 1 ? 0 : prev + 1
                            )
                          }
                          type="button"
                        >
                          <ChevronRight />
                        </PS.ArrowButton>
                      </PS.ImageNavigation>

                      <PS.MediaList>
                        {existingMedia.map((media, index) => (
                          <PS.MediaThumbnail
                            key={`existing-${index}`}
                            onClick={() => setCurrentMediaIndex(index)}
                            style={{
                              border:
                                index === currentMediaIndex
                                  ? "2px solid #8b5cf6"
                                  : "1px solid",
                            }}
                          >
                            {media.type === "image" ? (
                              <img
                                src={
                                  media.url.startsWith("http")
                                    ? media.url
                                    : `${import.meta.env.VITE_BASE_URL}/${media.url}`
                                }
                                alt={`Media ${index + 1}`}
                              />
                            ) : (
                              <video>
                                <source
                                  src={
                                    media.url.startsWith("http")
                                      ? media.url
                                      : `${import.meta.env.VITE_BASE_URL}/${media.url}`
                                  }
                                  type="video/mp4"
                                />
                              </video>
                            )}
                            <PS.MediaTypeBadge>
                              {media.type === "image" ? "IMG" : "VID"}
                            </PS.MediaTypeBadge>
                            <PS.RemoveMediaButton
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeExistingMedia(index);
                              }}
                            >
                              <X size={12} />
                            </PS.RemoveMediaButton>
                          </PS.MediaThumbnail>
                        ))}

                        {mediaPreview.map((media, index) => (
                          <PS.MediaThumbnail
                            key={`new-${index}`}
                            onClick={() =>
                              setCurrentMediaIndex(existingMedia.length + index)
                            }
                            style={{
                              border:
                                existingMedia.length + index === currentMediaIndex
                                  ? "2px solid #8b5cf6"
                                  : "1px solid",
                            }}
                          >
                            {media.type === "image" ? (
                              <img src={media.preview} alt={`Media ${index + 1}`} />
                            ) : (
                              <video>
                                <source src={media.preview} type="video/mp4" />
                              </video>
                            )}
                            <PS.MediaTypeBadge>
                              {media.type === "image" ? "IMG" : "VID"}
                            </PS.MediaTypeBadge>
                            <PS.RemoveMediaButton
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeMedia(index);
                              }}
                            >
                              <X size={12} />
                            </PS.RemoveMediaButton>
                          </PS.MediaThumbnail>
                        ))}
                      </PS.MediaList>
                    </PS.ImageGallery>
                  )}

                  {content && <PS.PreviewTextContent>{content}</PS.PreviewTextContent>}
                </PS.PreviewBody>

                <PS.MediaControlsContainer>
                  <PS.MediaCountBadge>
                    {totalMediaCount} / {MAX_FILES} files
                  </PS.MediaCountBadge>
                  <PS.AddMediaButton
                    type="button"
                    disabled={totalMediaCount >= MAX_FILES}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Plus size={16} />
                    Add Media
                  </PS.AddMediaButton>
                </PS.MediaControlsContainer>
              </PS.PreviewPost>
            )}
          </PS.PreviewContent>

          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            multiple
          />
        </PS.PreviewContainer>
      </div>
    </>
  );
};