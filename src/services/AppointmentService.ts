import { Appointment } from "@/components/appointments/Columns";

const baseUrl = "http://localhost:3000/api/appointments";

const getAll = async () => {
  const response = await fetch(baseUrl);
  const data = await response.json();
  return data;
};

const getById = async (id: string) => {
  const response = await fetch(`${baseUrl}/${id}`);
  const data = await response.json();
  return data;
};

const create = async (data: Appointment) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

const update = async (id: string, data: Appointment) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

const deleteById = async (id: string) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};

export default { getAll, getById, create, update, deleteById };
