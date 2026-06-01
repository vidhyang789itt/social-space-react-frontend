import { getToken } from "../utils/localStorage";

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
  isFormData?: boolean;
}

export const fetchClient = async <T>(
  Url: string,
  options: FetchOptions,
): Promise<T> => {
  const token = getToken();

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (options.requireAuth && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (options.isFormData) {
    headers["isFormData"] = "true";
  }

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  try{
    const response = await fetch(`${Url}`, {
      ...options,
      headers,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return await response.json();
  }
  catch(err){
    throw new Error("Server down");
  }
};
