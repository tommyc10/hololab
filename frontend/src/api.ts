const API_URL = "http://127.0.0.1:8000";

// --- INVENTORY (Existing) ---
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

export const deleteItem = async (itemId: number) => {
  const response = await fetch(`${API_URL}/items/${itemId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete item");
  return true;
}

// --- NEW ENDPOINTS (Add these!) ---

// 1. BOUNTIES
export interface Bounty {
  id: number;
  name: string;
  region: string;
  reward: number;
  status: string;
  type: string;
}

export const createBounty = async (bounty: Omit<Bounty, "id" | "status">) => {
  const response = await fetch(`${API_URL}/bounties`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bounty),
  });
  if (!response.ok) throw new Error("Failed to create bounty");
  return response.json();
};

export const getBounties = async (): Promise<Bounty[]> => {
  const response = await fetch(`${API_URL}/bounties`);
  if (!response.ok) throw new Error("Failed to fetch bounties");
  return response.json();
};

export const updateBountyStatus = async (id: number, status: string) => {
  const response = await fetch(`${API_URL}/bounties/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: status }), // Sending body as JSON
  });
  if (!response.ok) throw new Error("Failed to update bounty");
  return response.json();
};

// 2. FINANCE
export interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export const getFinance = async (): Promise<Transaction[]> => {
  const response = await fetch(`${API_URL}/finance`);
  if (!response.ok) throw new Error("Failed to fetch finance logs");
  return response.json();
};

// 3. OPERATIVES
export interface Operative {
  id: number;
  name: string;
  role: string;
  status: string;
  location: string;
  cover: string;
  image: string | null;
}

export const getOperatives = async (): Promise<Operative[]> => {
  const response = await fetch(`${API_URL}/operatives`);
  if (!response.ok) throw new Error("Failed to fetch operatives");
  return response.json();
};

// 4. HEAT MAP
export interface Planet {
  id: number;
  name: string;
  sector: string;
  coords: [number, number];
  risk: string;
  activity: string;
}

export const getHeatMap = async (): Promise<Planet[]> => {
  const response = await fetch(`${API_URL}/heat`);
  if (!response.ok) throw new Error("Failed to fetch galaxy map");
  return response.json();
};