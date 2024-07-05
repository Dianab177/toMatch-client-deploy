import axios from 'axios';


const baseUrl = process.env.REACT_APP_BACKEND_URL;


export const getPromotions = () => {
  return axios.get(baseUrl + "/promotions")
}

export const getPromotionsById = (id) => {
  return axios.get(baseUrl + "/promotions/" + id)
}

export const createPromotions = (data) => {
  return axios.post(baseUrl + "/promotions", data)
}

export const updatePromotions = (id, data) => {
  return axios.put(baseUrl + "/promotions/" + id, data)
}

export const deletePromotions = (id) => {
  return axios.delete(baseUrl + "/promotions/" + id)
}