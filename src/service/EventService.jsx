import axios from 'axios';


const baseUrl = process.env.REACT_APP_BACKEND_URL;


export const getEvento = () => {
  return axios.get(baseUrl + "/events")
}

export const getEventoById = (id) => {
  return axios.get(baseUrl + "/events/" + id)
}

export const createEvento = (data) => {
  return axios.post(baseUrl + "/events", data)
}

export const updateEvento = (id, data) => {
  return axios.put(baseUrl + "/events/" + id, data)
}

export const deleteEvento = (id) => {
  return axios.delete(baseUrl + "/events/" + id)
}