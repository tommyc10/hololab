const API_URL = "http://127.0.0.1:8000";

export interface Item {
  id: number;
  name: string;
  description: string | null;
  price: number;
  is_active: boolean;
}

export const getItems = async (): Promise<Item[]> => {
  const response = await fetch(`${API_URL}/items/`);
  if (!response.ok) throw new Error("Failed to fetch items");
  return response.json();
};

export const createItem = async (itemData: Omit<Item, "id" | "is_active">) => {
  const response = await fetch(`${API_URL}/items/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...itemData, is_active: true }),
  });
  if (!response.ok) throw new Error("Failed to create item");
  return response.json();
};