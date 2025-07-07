import type { MessageRequest, AuthResponse } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

async function apiFetch<T>(
  endpoint: string,
  method: string = "GET",
  body?: any,
  requiresAuth: boolean = false,
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if(requiresAuth) {
    const token = localStorage.getItem("token");
    if(token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if(!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || 
      (response.status === 401 ? "Invalid email or password" : "Request failed");
    throw new Error(errorMessage);
  }

  return response.json();
}

export const authApi = {
  signup: (data: {
    username: string,
    email: string,
    password: string,
  }): Promise<AuthResponse> => apiFetch("/auth/signup", "POST", data),

  login: (data: {
    email: string,
    password: string,
  }): Promise<AuthResponse> => apiFetch("/auth/login", "POST", data),
};

export const messageApi = {
  compose: (request: MessageRequest): Promise<{ message: string}> => apiFetch("/compose-message", "POST", request, true),
};