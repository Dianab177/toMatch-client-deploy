import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json'
  }
});

export const getEvento = () => {
  return axiosInstance.get("/events");
}

export const getEventoById = (id) => {
  return axiosInstance.get("/events/" + id);
}

export const createEvento = (data) => {
  return axiosInstance.post("/events", data);
}

export const updateEvento = (id, data) => {
  return axiosInstance.put("/events/" + id, data);
}

export const deleteEvento = (id) => {
  return axiosInstance.delete("/events/" + id);
}
