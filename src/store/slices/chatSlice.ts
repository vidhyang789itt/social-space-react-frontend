import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getConversationsApi,
  getMessagesApi,
  createConversationApi,
  getUnreadChatCountApi,
  createGroupChatApi,
  addGroupMemberApi,
  removeGroupMemberApi,
  leaveGroupApi,
  updateGroupInfoApi,
  updateGroupImageApi,
  deleteGroupApi,
  deleteMessageApi,
} from "../../api/chat.api";
import type { ConversationType } from "../../types/Conversation";
import type { MessageType } from "../../types/message.type";
import { followUser, unfollowUser } from "./userSlice";

// interface PaginatedMessagesResponse {
//   messages: MessageType[];
//   totalMessages: number;
//   totalPages: number;
//   currentPage: number;
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
// }

interface MessagesPagination {
  currentPage: number;
  totalPages: number;
  totalMessages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface ChatState {
  conversations: ConversationType[];
  activeMessages: MessageType[];
  activeConversation: ConversationType | null;
  onlineUsers: string[];
  loading: boolean;
  error: string | null;
  unreadChatCount: number;
  onlineUsersLastUpdate: number;
  messagesPagination: MessagesPagination;
  isLoadingMessages: boolean;
}

const initialState: ChatState = {
  conversations: [],
  activeMessages: [],
  activeConversation: null,
  onlineUsers: [],
  loading: false,
  error: null,
  unreadChatCount: 0,
  onlineUsersLastUpdate: 0,
  messagesPagination: {
    currentPage: 1,
    totalPages: 0,
    totalMessages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  isLoadingMessages: false,
};

export const fetchUnreadChatCount = createAsyncThunk(
  "chat/fetchUnreadCount",
  async (_, { rejectWithValue }) => {
    try {
      return await getUnreadChatCountApi();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const startConversation = createAsyncThunk(
  "chat/startConversation",
  async (otherUserId: string, { rejectWithValue }) => {
    try {
      const response = await createConversationApi(otherUserId);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getConversationsApi();
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (
    {
      conversationId,
      page = 1,
      limit = 50,
    }: {
      conversationId: string;
      page?: number;
      limit?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await getMessagesApi(conversationId, page, limit);
      console.log(response);

      return response;
    } catch (err: any) {
      console.error("❌ fetchMessages error:", err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const createGroupChat = createAsyncThunk(
  "chat/createGroupChat",
  async (
    {
      groupName,
      memberIds,
      groupImage,
    }: { groupName: string; memberIds: string[]; groupImage?: File | null },
    { rejectWithValue }
  ) => {
    try {
      const response = await createGroupChatApi(groupName, memberIds, groupImage);
      return response;
    } catch (err: any) {
      console.error("❌ createGroupChat error:", err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const addGroupMember = createAsyncThunk(
  "chat/addGroupMember",
  async (
    { groupId, memberIds }: { groupId: string; memberIds: string | string[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await addGroupMemberApi(groupId, memberIds);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeGroupMember = createAsyncThunk(
  "chat/removeGroupMember",
  async (
    { groupId, userId }: { groupId: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await removeGroupMemberApi(groupId, userId);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const leaveGroup = createAsyncThunk(
  "chat/leaveGroup",
  async (groupId: string, { rejectWithValue }) => {
    try {
      const response = await leaveGroupApi(groupId);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateGroupInfo = createAsyncThunk(
  "chat/updateGroupInfo",
  async (
    {
      groupId,
      groupName,
    }: { groupId: string; groupName?: string; groupImage?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateGroupInfoApi(groupId, groupName);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateGroupImage = createAsyncThunk(
  "chat/updateGroupImage",
  async (
    {
      groupId,
      file,
    }: { groupId: string; file: File },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateGroupImageApi(groupId, file);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  "chat/deleteGroup",
  async (groupId: string, { rejectWithValue }) => {
    try {
      const response = await deleteGroupApi(groupId);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteMsgForMe = createAsyncThunk(
  "chat/deleteMsgForMe",
  async (messageId: string, { rejectWithValue }) => {
    try {
      console.log("in slice");
      await deleteMessageApi(messageId);
      return messageId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      const newOnlineUsers = action.payload || [];

      const normalizedUsers: string[] = Array.from(
        new Set(newOnlineUsers.map((id: string) => String(id).trim()))
      );

      if (
        JSON.stringify(state.onlineUsers) !==
        JSON.stringify(normalizedUsers)
      ) {
        state.onlineUsers = normalizedUsers;
        state.onlineUsersLastUpdate = Date.now();
      }
    },
    receiveNewMessage: (state, action) => {
      const newMessage: MessageType = action.payload;

      const convIndex = state.conversations.findIndex(
        (c) => c._id === newMessage.conversationId
      );

      console.log(convIndex);


      if (convIndex !== -1) {
        const existingConv = state.conversations[convIndex];

        let updatedUnreadCountUser1 = existingConv.unreadCountUser1 || 0;
        let updatedUnreadCountUser2 = existingConv.unreadCountUser2 || 0;
        let updatedGroupUnreadCounts = existingConv.groupUnreadCounts || [];
        let updatedLastMessage =
          newMessage.content || `[${newMessage.messageType?.toUpperCase()}]`;
        let unreadCountIncrement = 0;

        if (state.activeConversation?._id !== newMessage.conversationId) {
          if (existingConv.type === "direct") {
            if (newMessage.receiverId?.userId === existingConv.user1?.userId) {
              if (existingConv.unreadCountUser1 === 0) {
                updatedUnreadCountUser1 = 1;
                unreadCountIncrement = 1;
              } else {
                updatedUnreadCountUser1 = (existingConv.unreadCountUser1 || 0) + 1;
                unreadCountIncrement = 1;
              }
            } else if (
              newMessage.receiverId?.userId === existingConv.user2?.userId
            ) {
              if (existingConv.unreadCountUser2 === 0) {
                updatedUnreadCountUser2 = 1;
                unreadCountIncrement = 1;
              } else {
                updatedUnreadCountUser2 = (existingConv.unreadCountUser2 || 0) + 1;
                unreadCountIncrement = 1;
              }
            }
          } else if (
            existingConv.type === "group" &&
            existingConv.groupUnreadCounts
          ) {
            updatedGroupUnreadCounts = existingConv.groupUnreadCounts.map(
              (item) => {
                if (item._id !== newMessage.senderId?._id) {
                  if (item.unreadCount === 0) {
                    unreadCountIncrement += 1;
                  } else {
                    unreadCountIncrement += 1;
                  }

                  return {
                    ...item,
                    unreadCount: (item.unreadCount || 0) + 1,
                  };
                }
                return item;
              }
            );
          }
        }

        const updatedConv: ConversationType = {
          ...existingConv,
          lastMessage: updatedLastMessage,
          updatedAt: new Date(newMessage.createdAt),
          lastMessageSender: newMessage.senderId,
          unreadCountUser1: updatedUnreadCountUser1,
          unreadCountUser2: updatedUnreadCountUser2,
          groupUnreadCounts: updatedGroupUnreadCounts,
        };

        state.conversations.splice(convIndex, 1);
        state.conversations.unshift(updatedConv);

        if (unreadCountIncrement > 0) {
          state.unreadChatCount += unreadCountIncrement;
        }
      }

      if (state.activeConversation?._id === newMessage.conversationId) {
        const isDuplicate = state.activeMessages.some(
          (m) => m._id === newMessage._id
        );

        if (!isDuplicate) {
          state.activeMessages.push(newMessage);
          state.activeMessages.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() -
              new Date(b.createdAt).getTime()
          );
        }

        // if(newMessage.receiverId) markAsRead(state.activeConversation._id, newMessage.receiverId._id, newMessage.senderId.userId);
      }
    },
    markConversationAsRead: (state, action) => {
      const { convId, _id } = action.payload;

      const convIndex = state.conversations.findIndex((c) => c._id === convId);

      if (convIndex !== -1) {
        const conv = state.conversations[convIndex];

        if (conv.type === "direct") {
          const isUser1 = _id === conv.user1?._id;
          const countToClear = isUser1
            ? conv.unreadCountUser1
            : conv.unreadCountUser2;

          if (countToClear && countToClear > 0) {
            state.unreadChatCount = Math.max(
              0,
              state.unreadChatCount - countToClear
            );
          }

          const updatedConv = {
            ...conv,
            unreadCountUser1: isUser1 ? 0 : conv.unreadCountUser1,
            unreadCountUser2: isUser1 ? conv.unreadCountUser2 : 0,
          };

          state.conversations[convIndex] = updatedConv;
        } else if (conv.type === "group" && conv.groupUnreadCounts) {
          const unreadItem = conv.groupUnreadCounts.find(
            (item) => item._id === _id
          );

          if (unreadItem && unreadItem.unreadCount > 0) {
            state.unreadChatCount = Math.max(
              0,
              state.unreadChatCount - unreadItem.unreadCount
            );
          }

          const updatedGroupUnreadCounts = conv.groupUnreadCounts.map((item) =>
            item._id === _id ? { ...item, unreadCount: 0 } : item
          );

          const updatedConv = {
            ...conv,
            groupUnreadCounts: updatedGroupUnreadCounts,
          };

          state.conversations[convIndex] = updatedConv;
        }
      }

      if (state.activeConversation && state.activeConversation._id === convId) {
        if (state.activeConversation.type === "direct") {
          if (_id === state.activeConversation.user1?._id) {
            state.activeConversation.unreadCountUser1 = 0;
          } else {
            state.activeConversation.unreadCountUser2 = 0;
          }
        } else if (
          state.activeConversation.type === "group" &&
          state.activeConversation.groupUnreadCounts
        ) {
          const unreadItem =
            state.activeConversation.groupUnreadCounts.find(
              (item) => item._id === _id
            );
          if (unreadItem) {
            unreadItem.unreadCount = 0;
          }
        }
      }
    },
    clearActiveChat: (state) => {
      state.activeMessages = [];
      state.activeConversation = null;

      state.messagesPagination = {
        currentPage: 1,
        totalPages: 0,
        totalMessages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      };
    },
    setUnreadChatCount: (state, action) => {
      state.unreadChatCount = action.payload;
    },
    updateConversationInStore: (state, action) => {
      const { conversationId, updates } = action.payload;
      const convIndex = state.conversations.findIndex(
        (c) => c._id === conversationId
      );

      if (convIndex !== -1) {
        state.conversations[convIndex] = {
          ...state.conversations[convIndex],
          ...updates,
        };
      }

      if (state.activeConversation?._id === conversationId) {
        state.activeConversation = {
          ...state.activeConversation,
          ...updates,
        };
      }
    },
    deleteMessage: (state, action) => {
      const { messageId, deleteForAll } = action.payload;

      const msgIndex = state.activeMessages.findIndex(
        (m) => m._id.toString() === messageId
      );

      if (msgIndex !== -1) {
        if (deleteForAll) {
          state.activeMessages[msgIndex] = {
            ...state.activeMessages[msgIndex],
            isDeletedForAll: true,
            content: "",
            media: [],
            messageType: "text",
          };
          console.log(`✅ Message marked as deleted for all: ${messageId}`);
        } else {
          state.activeMessages.splice(msgIndex, 1);
          console.log(`✅ Message removed for current user: ${messageId}`);
        }
      }
    },
    handleMessageDeletedFromSocket: (state, action) => {
      const { messageId, deleteForAll } = action.payload;

      const msgIndex = state.activeMessages.findIndex(
        (m) => m._id.toString() === messageId
      );

      if (msgIndex !== -1) {
        if (deleteForAll) {
          state.activeMessages[msgIndex] = {
            ...state.activeMessages[msgIndex],
            isDeletedForAll: true,
            content: "",
            media: [],
            messageType: "text",
          };
          console.log(
            `🗑️ Message updated as deleted for all from socket: ${messageId}`
          );
        } else {
          state.activeMessages.splice(msgIndex, 1);
          console.log(
            `🗑️ Message removed for current user from socket: ${messageId}`
          );
        }
      }
    },
    handleNewGroupReceived: (state, action) => {
      const newGroup = action.payload;

      const groupExists = state.conversations.some(
        (conv) => conv._id === newGroup.groupId
      );

      if (!groupExists) {
        const newConversation: ConversationType = {
          _id: newGroup.groupId,
          groupName: newGroup.groupName,
          type: "group",
          groupMembers: newGroup.members,
          groupAdmin: newGroup.createdBy,
          groupImage: "",
          lastMessage: `${newGroup.groupName} group created`,
          lastMessageSender: {
            _id: newGroup.createdBy,
            username: ""
          },
          lastMessageTime: new Date(newGroup.createdAt),
          updatedAt: newGroup.createdAt,
          createdAt: newGroup.createdAt,
        };

        state.conversations.unshift(newConversation);
        console.log("✅ New group received and added:", newGroup.groupName);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("❌ Conversations fetch failed:", action.payload);
      })
      .addCase(fetchMessages.pending, (state) => {
        state.isLoadingMessages = true;
      })
      .addCase(
        fetchMessages.fulfilled,
        (state, action) => {
          state.isLoadingMessages = false;

          const {
            messages,
            totalMessages,
            totalPages,
            currentPage,
            hasNextPage,
            hasPreviousPage,
          } = action.payload;

          if (currentPage === 1) {
            state.activeMessages = messages;
          } else {
            state.activeMessages = [...messages, ...state.activeMessages];
          }

          state.messagesPagination = {
            currentPage,
            totalPages,
            totalMessages,
            hasNextPage,
            hasPreviousPage,
          };

          const conversationId = action.meta.arg.conversationId as string;

          const conversation = state.conversations.find(
            (c) => c._id === conversationId
          );

          if (conversation) {
            state.activeConversation = conversation;
          }
        }
      )
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoadingMessages = false;
        console.error("❌ Messages fetch failed:", action.payload);
      })
      .addCase(startConversation.fulfilled, (state, action) => {
        state.activeConversation = action.payload;
        state.activeMessages = [];

        const exists = state.conversations.some(
          (c: ConversationType) => c._id === action.payload._id
        );
        if (!exists) {
          state.conversations.unshift(action.payload);
        } else {
          const index = state.conversations.findIndex(
            (c) => c._id === action.payload._id
          );
          if (index > 0) {
            const conv = state.conversations.splice(index, 1)[0];
            state.conversations.unshift(conv);
          }
        }
      })
      .addCase(fetchUnreadChatCount.fulfilled, (state, action) => {
        console.log(action.payload);

        state.unreadChatCount = action.payload.count;
      })
      .addCase(createGroupChat.fulfilled, (state, action) => {
        state.activeConversation = action.payload;
        state.activeMessages = [];
        state.conversations.unshift(action.payload);
      })
      .addCase(addGroupMember.fulfilled, (state, action) => {
        if (state.activeConversation?._id === action.payload._id) {
          state.activeConversation = action.payload;
        }
        const convIndex = state.conversations.findIndex(
          (c) => c._id === action.payload._id
        );
        if (convIndex !== -1) {
          state.conversations[convIndex] = action.payload;
        }
      })
      .addCase(removeGroupMember.fulfilled, (state, action) => {
        if (state.activeConversation?._id === action.payload._id) {
          state.activeConversation = action.payload;
        }
        const convIndex = state.conversations.findIndex(
          (c) => c._id === action.payload._id
        );
        if (convIndex !== -1) {
          state.conversations[convIndex] = action.payload;
        }
      })
      .addCase(leaveGroup.fulfilled, (state) => {
        state.activeConversation = null;
        state.activeMessages = [];
      })
      .addCase(updateGroupInfo.fulfilled, (state, action) => {
        if (state.activeConversation?._id === action.payload._id) {
          state.activeConversation = action.payload;
        }
        const convIndex = state.conversations.findIndex(
          (c) => c._id === action.payload._id
        );
        if (convIndex !== -1) {
          state.conversations[convIndex] = action.payload;
        }
      })
      .addCase(updateGroupImage.fulfilled, (state, action) => {
        if (state.activeConversation?._id === action.payload._id) {
          state.activeConversation = action.payload;
        }
        const convIndex = state.conversations.findIndex(
          (c) => c._id === action.payload._id
        );
        if (convIndex !== -1) {
          state.conversations[convIndex] = action.payload;
        }
      })
      .addCase(followUser.fulfilled, (state, action) => {
        const { targetUserId, currentUserId } = action.payload;

        if (state.activeConversation?.type === "direct") {
          if (
            state.activeConversation.user1?.userId === targetUserId ||
            state.activeConversation.user1?._id === targetUserId
          ) {
            if (!state.activeConversation.user1.followers) {
              state.activeConversation.user1.followers = [];
            }
            if (
              !state.activeConversation.user1.followers.includes(currentUserId)
            ) {
              state.activeConversation.user1.followers.push(currentUserId);
            }
          }
          if (
            state.activeConversation.user2?.userId === targetUserId ||
            state.activeConversation.user2?._id === targetUserId
          ) {
            if (!state.activeConversation.user2.followers) {
              state.activeConversation.user2.followers = [];
            }
            if (
              !state.activeConversation.user2.followers.includes(currentUserId)
            ) {
              state.activeConversation.user2.followers.push(currentUserId);
            }
          }
        }
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        const { targetUserId, currentUserId } = action.payload;

        if (state.activeConversation?.type === "direct") {
          if (
            state.activeConversation.user1?.userId === targetUserId ||
            state.activeConversation.user1?._id === targetUserId
          ) {
            if (state.activeConversation.user1.followers) {
              state.activeConversation.user1.followers =
                state.activeConversation.user1.followers.filter(
                  (id) => id !== currentUserId
                );
            }
          }
          if (
            state.activeConversation.user2?.userId === targetUserId ||
            state.activeConversation.user2?._id === targetUserId
          ) {
            if (state.activeConversation.user2.followers) {
              state.activeConversation.user2.followers =
                state.activeConversation.user2.followers.filter(
                  (id) => id !== currentUserId
                );
            }
          }
        }
      })
      .addCase(deleteMsgForMe.fulfilled, (state, action) => {
        console.log("✅ deleteMsgForMe: API Success", action.payload);

        if (action.payload) {
          const messageId = action.payload;
          const msgIndex = state.activeMessages.findIndex(
            (m) => m._id.toString() === messageId.toString()
          );

          if (msgIndex !== -1) {
            state.activeMessages.splice(msgIndex, 1);
          }
        }
      })
  },
});

export const {
  receiveNewMessage,
  clearActiveChat,
  setOnlineUsers,
  markConversationAsRead,
  setUnreadChatCount,
  updateConversationInStore,
  deleteMessage,
  handleMessageDeletedFromSocket,
  handleNewGroupReceived
} = chatSlice.actions;

export default chatSlice.reducer;