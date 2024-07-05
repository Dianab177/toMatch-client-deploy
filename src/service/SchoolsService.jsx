import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const getSchools = () => {
  return axios.get(baseUrl + "/schools")
}

export const getSchoolsById = (id) => {
  return axios.get(baseUrl + "/schools/" + id)
}

export const createSchools = (data) => {
  return axios.post(baseUrl + "/schools", data)
}

export const updateSchools = (id, data) => {
  return axios.put(baseUrl + "/schools/" + id, data)
}

export const deleteSchools = (id) => {
  return axios.delete(baseUrl + "/schools/" + id)
}