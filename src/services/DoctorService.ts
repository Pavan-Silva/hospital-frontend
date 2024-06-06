import { Doctor } from "@/features/doctors/Columns";

const baseUrl = "http://localhost:3000/api/doctors";

const getAll = async () => {
  const response = await fetch(baseUrl, {
    credentials: "include",
  });
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

const create = async (data: Doctor) => {
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

const update = async (id: string, data: Doctor) => {
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
