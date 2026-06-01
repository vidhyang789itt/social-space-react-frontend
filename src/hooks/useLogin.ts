import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/stores";
import { login, clearError } from "../store/slices/authSlice";
import { getToken } from "../utils/localStorage";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (getToken()) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));

    if (error) dispatch(clearError());
  };

  const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resultAction = await dispatch(login(credentials));

    if (login.fulfilled.match(resultAction)) {
      navigate("/home");
    }
  };

  return {
    ...credentials,
    loading,
    error,
    handleChange,
    handleLogin,
    clearAuthError: () => dispatch(clearError()),
  };
};
