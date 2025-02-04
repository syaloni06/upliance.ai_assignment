import { useEffect, useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import dayjs from "dayjs"; // Install using `npm install dayjs`

const Chart = () => {
  const [counterUsage, setCounterUsage] = useState([]);
  const [maxCounterValues, setMaxCounterValues] = useState([]);

  const storedUserData = JSON.parse(localStorage.getItem("userData")) || [];

// Aggregate users per date
const userCountByDate = storedUserData.reduce((acc, user) => {
  const dateKey = dayjs(user.date).format("YYYY-MM-DD"); // Format date

  if (!acc[dateKey]) {
    acc[dateKey] = 0;
  }
  acc[dateKey] += 1; // Increment user count for that date
  return acc;
}, {});

// Convert object to array format for chart
const userData = Object.keys(userCountByDate).map((date) => ({
  date,
  users: userCountByDate[date],
}));


  useEffect(() => {
    // Simulating fetching data from local storage or an API
    // const storedUserData = JSON.parse(localStorage.getItem("userData")) || [];
    const storedCounterUsage = JSON.parse(localStorage.getItem("counterUsage")) || [];
    const storedMaxCounterValues = JSON.parse(localStorage.getItem("maxCounterValues")) || [];

    setCounterUsage(storedCounterUsage);
    setMaxCounterValues(storedMaxCounterValues);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Users Over Time Chart */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Users Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Counter Usage Chart */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Counter Usage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={counterUsage}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="increments" fill="#82ca9d" />
            <Bar dataKey="resets" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Highest Counter Value Chart */}
      <div className="bg-white p-4 shadow rounded-lg col-span-1 md:col-span-2">
        <h2 className="text-xl font-bold mb-4">Highest Counter Value Reached</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={maxCounterValues}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="session" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="maxValue" stroke="#d9534f" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
