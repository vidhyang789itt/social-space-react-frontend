import { Header } from "./Header";
import Sidebar from "./SideBar";
import {
  LayoutWrapper,
  MainContent,
  PageContainer,
} from "../../styles/layout.styles";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import MobileBottomNav from "./MobileBottomNav";
import { ThemeManager } from "../theme/ThemeContext";
import { useNotifications } from "../../hooks/useNotifications";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/stores";
import { initializeSocket } from "../../api/socket";
import { useUpdate } from "../../hooks/useUpdate";
import { fetchConversations } from "../../store/slices/chatSlice";
import { useCall } from "../../hooks/useCall";
import CallNotification from "../call/callNotification";

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useNotifications();
  useUpdate();
  const dispatch = useDispatch<AppDispatch>();

  const { user : currentUser } = useSelector((state: RootState) => state.auth);
  const {handleAcceptCall,
          handleRejectCall,
          incomingCall} = useCall();

  useEffect(() => {
    if (currentUser?.userId) {
      initializeSocket(currentUser.userId);
    }
    if(currentUser?.userId) {
      dispatch(fetchConversations());
    }
  }, [currentUser?.userId]);

  return (
    <ThemeManager>
      <LayoutWrapper>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <PageContainer>
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <MainContent
            style={{
              marginLeft: sidebarOpen ? "256px" : "80px",
              transition: "margin-left 0.5s ease-in-out",
            }}
          >
            <CallNotification
              incomingCall={incomingCall}
              onAccept={handleAcceptCall}
              onReject={handleRejectCall}
            />
            <Outlet />
          </MainContent>
        </PageContainer>

        <MobileBottomNav />
      </LayoutWrapper>
    </ThemeManager>
  );
};