import axios from 'axios';


const baseUrl = process.env.REACT_APP_BACKEND_URL;


export const getRecruiters = () => {
  return axios.get(baseUrl + "/recruiters")
}

export const getRecruitersById = (id) => {
  return axios.get(baseUrl + "/recruiters/" + id)
}

export const createRecruiters = (data) => {
  return axios.post(baseUrl + "/recruiters", data)
}

export const updateRecruiters = (id, data) => {
  return axios.put(baseUrl + "/recruiters/" + id, data)
}

export const deleteRecruiters = (id) => {
  return axios.delete(baseUrl + "/recruiters/" + id)
}

export const updateRecruitersLanguagesAttach = (id, data) => {
  return axios.post(baseUrl + "/recruiters/languages" + id, data)
}

export const updateRecruitersLanguagesDeAttach = (id, data) => {
  return axios.post(baseUrl + "/recruiters/languages/detach" + id, data)
}

export const updateRecruitersStacksAttach = (id, data) => {
  return axios.post(baseUrl + "/recruiters/stacks" + id, data)
}

export const updateRecruitersStacksDeAttach = (id, data) => {
  return axios.post(baseUrl + "/recruiters/stacks/detach" + id, data)
}

export const createExcelRecruiters = (data) => {
  return axios.post(baseUrl + "/upload/excel/recruiters", data, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*'
}});}
