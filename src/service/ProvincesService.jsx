import axios from 'axios';


const baseUrl = process.env.REACT_APP_BACKEND_URL;


export const getProvinces = () => {
  return axios.get(baseUrl + "/provinces")
}

export const getProvincesById = (id) => {
  return axios.get(baseUrl + "/provinces/" + id)
}

export const createProvinces = (data) => {
  return axios.post(baseUrl + "/provinces", data)
}

export const updateProvinces = (id, data) => {
  return axios.put(baseUrl + "/provinces/" + id, data)
}

export const deleteProvinces = (id) => {
  return axios.delete(baseUrl + "/provinces/" + id)
}