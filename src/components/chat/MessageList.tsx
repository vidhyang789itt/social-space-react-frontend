import React, { useState, useEffect } from "react";
import { FileText, Trash2, X, ChevronLeft, ChevronRight, Reply } from "lucide-react";
import type { MessageType } from "../../types/message.type";
import { MessageActions } from "./messageAction";
import * as S from "../../styles/messageList.styles";
import * as ImageS from "../../styles/messageList.styles";

interface MessageListProps {
  messages: MessageType[];
  isGroup: boolean;
  isDirect: boolean;
  currentUserId?: string;
  groupName?: string;
  messagesStartRef?: React.RefObject<HTMLDivElement | null>;
  messagesEndRef?: React.RefObject<HTMLDivElement | null>;
  getFullUrl: (url: string) => string;
  onDeleteMessage?: (messageId: string, deleteForAll: boolean) => void;
  onReply?: (messageId: string, senderName: string, content: string) => void;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void; 
  onScrollToBottom?: () => void;
}

interface ImageMedia {
  url: string;
  messageId: string;
  index: number;
}

const getDateLabel = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const messageDate = new Date(date);
  const messageDay = messageDate.toDateString();

  if (messageDay === today.toDateString()) {
    return "Today";
  } else if (messageDay === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return messageDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        messageDate.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
    });
  }
};

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isGroup,
  currentUserId,
  groupName = "Chat",
  messagesStartRef,
  messagesEndRef,
  getFullUrl,
  onDeleteMessage,
  onScroll,
  onReply,
  onScrollToBottom
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageMedia | null>(null);
  const [allImages, setAllImages] = useState<ImageMedia[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    const images: ImageMedia[] = [];
    messages.forEach((msg) => {
      if (msg.media && msg.media.length > 0) {
        msg.media.forEach((m, idx) => {
          if (m.type === "image") {
            images.push({
              url: m.url,
              messageId: msg._id,
              index: idx,
            });
          }
        });
      }
    });
    setAllImages(images);
  }, [messages]);

  const groupedMessages = messages.reduce(
    (acc, msg) => {
      const messageDate = new Date(msg.createdAt);
      const dateKey = messageDate.toDateString();

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(msg);
      return acc;
    },
    {} as Record<string, MessageType[]>
  );

  const handleInternalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    
    onScroll?.(e);

    const isAtBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight < 100;

    if (isAtBottom) {
      onScrollToBottom?.();
    }
  };

  const handleOpenImage = (originalUrl: string, messageId: string, index: number) => {
    const imgIdx = allImages.findIndex(
      (img) => img.url === originalUrl && img.messageId === messageId && img.index === index
    );

    if (imgIdx !== -1) {
      setCurrentImageIndex(imgIdx);
      setSelectedImage(allImages[imgIdx]);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < allImages.length - 1) {
      const nextIdx = currentImageIndex + 1;
      setCurrentImageIndex(nextIdx);
      setSelectedImage(allImages[nextIdx]);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      const prevIdx = currentImageIndex - 1;
      setCurrentImageIndex(prevIdx);
      setSelectedImage(allImages[prevIdx]);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(allImages[index]);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "Escape") handleCloseModal();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, currentImageIndex, allImages.length]);

  return (
    <S.MessageListContainer onScroll={handleInternalScroll}>
      <div ref={messagesStartRef} style={{ height: "1px" }} />

      {messages.length === 0 ? (
        <S.EmptyState>
          <div>
            <S.EmptyStateTitle>{groupName}</S.EmptyStateTitle>
            <S.EmptyStateDescription>
              This is the beginning of your conversation
            </S.EmptyStateDescription>
          </div>
        </S.EmptyState>
      ) : (
        Object.entries(groupedMessages).map(([dateKey, dayMessages]) => (
          <div key={dateKey}>
            <S.StickyDateBadge>
              <S.StickyDateLabel>
                {getDateLabel(new Date(dateKey))}
              </S.StickyDateLabel>
            </S.StickyDateBadge>

            {dayMessages.map((msg: MessageType) => {
              const isMe = msg.senderId?.userId === currentUserId;
              const isMenuOpen = openMenuId === msg._id;
              const isDeletedForAll = (msg as any).isDeletedForAll;
              const hasReply = (msg as any).replyTo && (msg as any).replyTo.content; // ADD THIS

              return (
                <S.MessageItemWrapper 
                  key={msg._id} 
                  $isMe={isMe}
                  data-message-id={msg._id}
                >
                  <S.MessageContentWrapper $isMe={isMe}>
                    {onDeleteMessage && (
                      <S.ActionSection
                        className="message-actions"
                        data-open={isMenuOpen ? "true" : "false"}
                      >
                      <MessageActions
                        messageId={msg._id}
                        senderId={msg.senderId?.userId || ""}
                        currentUserId={currentUserId || ""}
                        isMe={isMe}
                        messageCreatedAt={msg.createdAt}
                        messageContent={msg.content || ""} 
                        senderName={msg.senderId?.username || "Unknown"}
                        onDeleteForMe={() => onDeleteMessage(msg._id, false)}
                        onDeleteForAll={() => onDeleteMessage(msg._id, true)}
                        onReply={(messageId, senderName, content) => {
                          onReply?.(messageId, senderName, content); 
                        }}
                        onOpenChange={(isOpen) => {
                          setOpenMenuId(isOpen ? msg._id : null);
                        }}
                      />
                      </S.ActionSection>
                    )}

                    <S.MessageContent $isMe={isMe}>
                      {isGroup && !isMe && (
                        <S.SenderName>{msg.senderId?.username}</S.SenderName>
                      )}

                      {isDeletedForAll ? (
                        <S.DeletedMessageBubble $isMe={isMe}>
                          <Trash2 size={14} />
                          <span>This message was deleted</span>
                        </S.DeletedMessageBubble>
                      ) : (
                        <>
                          {hasReply && (
                            <S.ReplyPreviewBox $isMe={isMe}>
                              <Reply size={14} style={{ flexShrink: 0, marginTop: "2px" }} />
                              <div style={{ flex: 1 }}>
                                <div className="reply-sender">
                                  {(msg as any).replyTo.senderName}
                                </div>
                                <div className="reply-content">
                                  {(msg as any).replyTo.content}
                                </div>
                              </div>
                            </S.ReplyPreviewBox>
                          )}

                          {msg.media && msg.media.length > 0 && (
                            <S.MediaContainer>
                              {msg.media.map((m, idx) => {
                                const fullUrl = getFullUrl(m.url);

                                return (
                                  <S.MediaItem key={idx}>
                                    {m.type === "image" && (
                                      <img
                                        src={fullUrl}
                                        alt="Message"
                                        onClick={() =>
                                          handleOpenImage(m.url, msg._id, idx)
                                        }
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).src =
                                            "/placeholder.png";
                                        }}
                                        style={{ cursor: "pointer" }}
                                      />
                                    )}
                                    {m.type === "video" && (
                                      <video controls>
                                        <source src={fullUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                      </video>
                                    )}
                                    {m.type === "file" && (
                                      <S.FileDownloadButton
                                        href={fullUrl}
                                        download={m.fileName}
                                      >
                                        <FileText size={20} />
                                        <S.FileName>
                                          <S.FileNameText>
                                            {m.fileName}
                                          </S.FileNameText>
                                          {m.fileSize && (
                                            <S.FileSize>
                                              {(
                                                m.fileSize /
                                                1024 /
                                                1024
                                              ).toFixed(2)}{" "}
                                              MB
                                            </S.FileSize>
                                          )}
                                        </S.FileName>
                                      </S.FileDownloadButton>
                                    )}
                                  </S.MediaItem>
                                );
                              })}
                            </S.MediaContainer>
                          )}

                          {msg.content && (
                            <S.MessageBubble $isMe={isMe}>
                              {msg.content}
                            </S.MessageBubble>
                          )}
                        </>
                      )}

                      <S.MessageMetadata $isMe={isMe}>
                        <S.Timestamp>
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </S.Timestamp>

                        {isGroup &&
                          isMe &&
                          msg.readBy &&
                          msg.readBy.length > 1 && (
                            <S.ReadByCount>
                              Read by {msg.readBy.length - 1}
                            </S.ReadByCount>
                          )}
                      </S.MessageMetadata>
                    </S.MessageContent>
                  </S.MessageContentWrapper>
                </S.MessageItemWrapper>
              );
            })}
          </div>
        ))
      )}

      <div ref={messagesEndRef} style={{ height: "1px" }} />

      {selectedImage && (
        <ImageS.ImageModalOverlay onClick={handleCloseModal}>
          <ImageS.CloseButton
            onClick={(e: any) => {
              e.stopPropagation();
              handleCloseModal();
            }}
            title="Close (ESC)"
          >
            <X size={24} />
          </ImageS.CloseButton>

          <ImageS.ImageContainer
            onClick={(e: any) => e.stopPropagation()}
          >
            <ImageS.ImageElement
              src={getFullUrl(selectedImage.url)}
              alt="Enlarged"
              onError={(e: any) => {
                (e.target as HTMLImageElement).src = "/placeholder.png";
              }}
            />

            {allImages.length > 1 && (
              <ImageS.NavButton
                onClick={(e: any) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                disabled={currentImageIndex === 0}
                isDisabled={currentImageIndex === 0}
                position="left"
                title="Previous"
              >
                <ChevronLeft size={24} />
              </ImageS.NavButton>
            )}

            {allImages.length > 1 && (
              <ImageS.NavButton
                onClick={(e: any) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                disabled={currentImageIndex === allImages.length - 1}
                isDisabled={currentImageIndex === allImages.length - 1}
                position="right"
                title="Next"
              >
                <ChevronRight size={24} />
              </ImageS.NavButton>
            )}
          </ImageS.ImageContainer>

          {allImages.length > 1 && (
            <ImageS.CounterDisplay>
              {currentImageIndex + 1} / {allImages.length}
            </ImageS.CounterDisplay>
          )}

          {allImages.length > 1 && (
            <ImageS.ThumbnailStripContainer
              onClick={(e: any) => e.stopPropagation()}
            >
              {allImages.map((img, idx) => (
                <ImageS.ThumbnailButton
                  key={idx}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleThumbnailClick(idx);
                  }}
                  isActive={currentImageIndex === idx}
                  title={`Image ${idx + 1}`}
                >
                  <img
                    src={getFullUrl(img.url)}
                    alt={`Thumbnail ${idx + 1}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.png";
                    }}
                  />
                </ImageS.ThumbnailButton>
              ))}
            </ImageS.ThumbnailStripContainer>
          )}
        </ImageS.ImageModalOverlay>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </S.MessageListContainer>
  );
};

export default MessageList;