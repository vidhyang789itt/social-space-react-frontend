import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/stores";
import { register, clearError } from "../store/slices/authSlice";
import { getToken } from "../utils/localStorage";

export const useRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (getToken()) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (error) dispatch(clearError());
  };

  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resultAction = await dispatch(register(formData));

    if (register.fulfilled.match(resultAction)) {
      navigate("/login");
    }
  };

  return {
    ...formData,
    loading,
    error,
    handleChange,
    handleRegister,
    clearAuthError: () => dispatch(clearError()),
  };
};
