const API = "import.meta.env.VITE_BACKEND_URL";

// Fetch all coffee (public)
export const fetchCoffee = async () => {
  const res = await fetch(`${API}/coffees`);
  if (!res.ok) throw new Error("Failed to fetch coffee");
  return res.json();
};

// Helper to build headers for authorized requests
const authHeaders = (token) =>
  token ? { Authorization: `Bearer ${token}` } : {};

// Create a new coffee(requires admin token)
export const createCoffee = async (formData, token) => {
  const res = await fetch(`${API}/coffees`, {
    method: "POST",
    body: formData,
    headers: authHeaders(token), //  only Authorization
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to create coffee");
  }
  return res.json();
};

// Update an existing coffee (requires admin token)
export const updateCoffee = async (id, formData, token) => {
  if (!token) throw new Error("Unauthorized: No token provided");

  const res = await fetch(`${API}/coffees/${id}`, {
    method: "PUT",
    body: formData,
    headers: authHeaders(token), // only Authorization
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to update coffee");
  }
  return res.json();
};

// Delete an coffee (requires admin token)
export const deleteCoffee = async (id, token) => {
  if (!token) throw new Error("Unauthorized: No token provided");

  const res = await fetch(`${API}/coffees/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to delete coffee");
  }
  return res.json();
};
