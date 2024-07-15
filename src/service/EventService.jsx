import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Authorization, Origin, X-Requested-With, Accept'
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
