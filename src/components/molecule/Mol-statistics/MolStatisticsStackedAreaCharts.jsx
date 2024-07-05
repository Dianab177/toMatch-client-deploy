import React, { useEffect, useState } from "react";
import { getScheduleCoder } from "../../../service/ScheduleService";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const MolStatisticsSimpleBarCharts = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    getScheduleCoder()
      .then((response) => {
        const schedules = response.data.map((schedule) => ({
          idRecruiter: schedule.idCoder,
          maxInterview: schedule.maxInterview
        }));
        setSchedule(schedules);
      })
      .catch((error) => console.error(error));
  }, []);

  const data = schedule.map((schedule) => ({
    idRecruiter: schedule.idCoder,
    maxInterview: schedule.maxInterview
  }));

  return (
    <ResponsiveContainer width="80%" height="80%" aspect={2}>
      <BarChart
        data={data}
        width={500}
        height={150}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="4 1 2" />
        <XAxis dataKey="idRecruiter" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="maxInterview" fill="#FF4700" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MolStatisticsSimpleBarCharts;
