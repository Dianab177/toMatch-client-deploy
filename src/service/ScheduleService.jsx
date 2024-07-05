import axios from 'axios';


const baseUrl = process.env.REACT_APP_BACKEND_URL;


export const getSchedule = () => {
  return axios.get(baseUrl + "/schedule").then((response) => {
    return { data: response.data.schedulerRecruiters };
  });
};


export const getScheduleCoder = () => {
  return axios.get(baseUrl + "/schedule/countCoder").then((response) => {
    return { data: response.data.match };
  });
};

export const getScheduleRecruiter = () => {
  return axios.get(baseUrl + "/schedule/countRecruiter").then((response) => {
    return { data: response.data.match };
  });
};


export const createSchedule = (data) => {
  return axios.post(baseUrl + "/schedule", data)
}

// export const updateSchedule = (id, data) => {
//   return axios.put(baseUrl + "/schedule/" + id, data)
// }

export const deleteSchedule = (id) => {
  return axios.delete(baseUrl + "/schedule/" + id)
}