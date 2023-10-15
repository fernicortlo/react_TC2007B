import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function MyBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/barChart')
      .then((response) => response.json())
      .then((ticketCounts) => {
        setData(ticketCounts);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <BarChart width={600} height={400} data={data}>
      <XAxis dataKey="_id">
     </XAxis>
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar dataKey="tickets" fill="#8884d8" />
    </BarChart>
  );
}

export default MyBarChart;

  