import axios from 'axios';


//const baseUrl = import.meta.env.REACT_APP_BACKEND_URL;
const baseUrl = process.env.REACT_APP_BACKEND_URL;


export const getStacks = () => {
  return axios.get(baseUrl + "/stacks")
}

export const getStacksById = (id) => {
  return axios.get(baseUrl + "/stacks/" + id)
}

export const createStacks = (data) => {
  return axios.post(baseUrl + "/stacks", data)
}

export const updateStacks = (id, data) => {
  return axios.put(baseUrl + "/stacks/" + id, data)
}

export const deleteStacks = (id) => {
  return axios.delete(baseUrl + "/stacks/" + id)
}