import axios from 'axios';


const baseUrl = process.env.REACT_APP_BACKEND_URL;


export const getLanguages = () => {
  return axios.get(baseUrl + "/languages")
}

export const getLanguagesById = (id) => {
  return axios.get(baseUrl + "/languages/" + id)
}

export const createLanguages = (data) => {
  return axios.post(baseUrl + "/languages", data)
}

export const updateLanguages = (id, data) => {
  return axios.put(baseUrl + "/languages/" + id, data)
}

export const deleteLanguages = (id) => {
  return axios.delete(baseUrl + "/languages/" + id)
}