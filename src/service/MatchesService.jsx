import axios from 'axios';


const baseUrl = process.env.REACT_APP_BACKEND_URL;


export const getSearchMatch = () => {
  return axios.get(baseUrl + "/match/search")
}

export const getMatch = () => {
  return axios.get(baseUrl + "/match").then((response) => {
    return { data: response.data.matches };
  });
};
// export const getMatch = (): Promise<{ data: any }> => {
//   return axios.get(baseUrl + "/match")
//     .then((response) => ({ data: response.data.matches }));
// };
// export const getMatchById = (id) => {
//   return axios.get(baseUrl + "/match/" + id)
// }

export const createMatch = (data) => {
  return axios.post(baseUrl + "/match", data)
}

// export const updateMatch = (id, data) => {
//   return axios.put(baseUrl + "/match/" + id, data)
// }

// export const deleteMatch = (id) => {
//   return axios.delete(baseUrl + "/match/" + id)
// }