import { Patient } from "@/features/patients/Columns";

const baseUrl = `${import.meta.env.VITE_API_URL}/patients`;

const getAll = async () => {
  const response = await fetch(baseUrl, { credentials: "include" });
  const data = await response.json();
  return data;
};

const getById = async (id: string) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

const create = async (data: Patient) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

const update = async (id: string, data: Patient) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

const deleteById = async (id: string) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const result = await response.json();
  return result;
};

export default { getAll, getById, create, update, deleteById };
