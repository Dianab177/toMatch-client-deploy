import axios from 'axios';


const baseUrl = process.env.REACT_APP_BACKEND_URL;


export const getRegions = () => {
  return axios.get(baseUrl + "/regions")
}

export const getRegionsById = (id) => {
  return axios.get(baseUrl + "/regions/" + id)
}

export const createRegions = (data) => {
  return axios.post(baseUrl + "/regions", data)
}

export const updateRegions = (id, data) => {
  return axios.put(baseUrl + "/regions/" + id, data)
}

export const deleteRegions = (id) => {
  return axios.delete(baseUrl + "/regions/" + id)
}