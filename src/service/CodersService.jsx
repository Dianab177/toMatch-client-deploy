import axios from 'axios';


const baseUrl = process.env.REACT_APP_BACKEND_URL;



export const getCoders = () => {
  return axios.get(baseUrl + "/coders")
}

export const getCodersById = (id) => {
  return axios.get(baseUrl + "/coders/" + id)
}

export const createCoders = (data) => {
  return axios.post(baseUrl + "/coders", data)
}

export const updateCoders = (id, data) => {
  return axios.put(baseUrl + "/coders/" + id, data)
}

export const deleteCoders = (id) => {
  return axios.delete(baseUrl + "/coders/" + id)
}

export const updateCodersLanguagesAttach = (id, data) => {
  return axios.post(baseUrl + "/coders/languages" + id, data)
}

export const updateCodersLanguagesDetach = (id, data) => {
  return axios.post(baseUrl + "/coders/languages/detach" + id, data)
}

export const updateCodersStacksAttach = (id, data) => {
  return axios.post(baseUrl + "/coders/stacks" + id, data)
}

export const updateCodersStacksDetach = (id, data) => {
  return axios.post(baseUrl + "/coders/stacks/detach" + id, data)
}

export const createExcelCoders = (data) => {
  return axios.post(baseUrl + "/upload/excel/coders", data, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*'
}});}
