import axios from 'axios';


const baseUrl = process.env.REACT_APP_BACKEND_URL;


export const getCompanies = () => {
  return axios.get(baseUrl + "/companies")
}

export const getCompaniesById = (id) => {
  return axios.get(baseUrl + "/companies/" + id)
}

export const createCompanies = (data) => {
  return axios.post(baseUrl + "/companies", data)
}

export const updateCompanies = (id, data) => {
  return axios.put(baseUrl + "/companies/" + id, data)
}

export const deleteCompanies = (id) => {
  return axios.delete(baseUrl + "/companies/" + id)
}

export const createExcelCompanies = (data) => {
  return axios.post(baseUrl + "/upload/excel/companies", data, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*'
}});}
