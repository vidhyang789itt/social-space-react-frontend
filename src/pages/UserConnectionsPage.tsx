import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnections, clearConnections } from "../store/slices/userSlice";
import type { RootState, AppDispatch } from "../store/stores";
import { UserList } from "../components/users/userLists";
import { PageWrapper } from "../styles/Users.Style";

export const UserConnectionsPage = () => {
  const { userId, connectionType } = useParams<{
    userId: string;
    connectionType: any;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const { connections } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (userId && connectionType) {
      dispatch(fetchConnections({ userId, type: connectionType }));
    }
    return () => {
      dispatch(clearConnections());
    };
  }, [dispatch, userId, connectionType]);

  return (
    <PageWrapper>
      <UserList
        title={connectionType}
        users={connections}
        currentUser={currentUser}
      />
    </PageWrapper>
  );
};
