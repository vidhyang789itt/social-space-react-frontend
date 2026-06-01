import React, { useRef, useEffect, useState } from "react";
import { Trash2, Clock, Reply } from "lucide-react";
import {
  ActionContainer,
  ActionButton,
  DropdownMenu,
  MenuItem,
  MenuDivider,
  Arrow,
  DisabledMenuItem,
} from "../../styles/messageAction.styles";
import {
  canDeleteForEveryone,
  getTimeRemainingToDelete,
  formatTimeRemaining
} from "../../utils/messageTime";

interface MessageActionsProps {
  messageId: string;
  senderId: string;
  currentUserId: string;
  isMe: boolean;
  messageCreatedAt: string;
  messageContent: string;
  senderName: string;
  onDeleteForMe: () => void;
  onDeleteForAll: () => void;
  onReply: (messageId: string, senderName: string, content: string) => void;
  onOpenChange?: (isOpen: boolean) => void;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  messageId,
  senderId,
  currentUserId,
  isMe,
  messageCreatedAt,
  messageContent,
  senderName,
  onDeleteForMe,
  onDeleteForAll,
  onReply,
  onOpenChange, 
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const isSender = senderId === currentUserId;

  useEffect(() => {
    const checkDeletePermission = () => {
      const canDeleteNow = canDeleteForEveryone(messageCreatedAt);
      setCanDelete(canDeleteNow);
      
      if (!canDeleteNow) {
        const remaining = getTimeRemainingToDelete(messageCreatedAt);
        setTimeRemaining(remaining);
      }
    };

    checkDeletePermission();

    timerRef.current = setInterval(checkDeletePermission, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [messageCreatedAt]);

  useEffect(() => {
    onOpenChange?.(showMenu);
  }, [showMenu, onOpenChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showMenu]);

  const handleReply = () => {
    onReply(messageId, senderName, messageContent);
    setShowMenu(false);
  };

  return (
    <ActionContainer ref={menuRef} $isMe={isMe}>
      <ActionButton
        ref={buttonRef}
        onClick={() => setShowMenu(!showMenu)}
        $isOpen={showMenu}
        title="Message options"
        type="button"
      >
        ⋮
      </ActionButton>

      {showMenu && (
        <>
          <Arrow $isMe={isMe} />
          <DropdownMenu $isMe={isMe}>
            <MenuItem
              onClick={handleReply}
              type="button"
            >
              <Reply size={16} />
              <span>Reply</span>
            </MenuItem>

            <MenuDivider />

            <MenuItem
              onClick={() => {
                onDeleteForMe();
                setShowMenu(false);
              }}
              type="button"
            >
              <Trash2 size={16} />
              <span>Delete for me</span>
            </MenuItem>

            {isSender && (
              <>
                <MenuDivider />
                {canDelete ? (
                  <MenuItem
                    $isDanger
                    onClick={() => {
                      onDeleteForAll();
                      setShowMenu(false);
                    }}
                    type="button"
                  >
                    <Trash2 size={16} />
                    <span>Delete for everyone</span>
                  </MenuItem>
                ) : (
                  <DisabledMenuItem
                    title={`Available in ${formatTimeRemaining(timeRemaining)}`}
                  >
                    <Clock size={16} />
                    <span>Delete for everyone</span>
                    <span className="time-remaining">
                      {formatTimeRemaining(timeRemaining)}
                    </span>
                  </DisabledMenuItem>
                )}
              </>
            )}
          </DropdownMenu>
        </>
      )}
    </ActionContainer>
  );
};