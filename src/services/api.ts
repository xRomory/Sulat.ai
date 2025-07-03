import type { MessageRequest } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function composeMessage(request: MessageRequest): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/compose-message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if(!response.ok) throw new Error("Failed to generate message");

  const data = await response.json()
  return data.message
};