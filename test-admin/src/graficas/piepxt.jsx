import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
//   // const RADIAN = Math.PI / 180;
  // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  // const x = cx + radius * Math.cos(-midAngle * RADIAN);
  // const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

const CustomPieChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/problemaTickets')
      .then((response) => response.json())
      .then((ticketCounts) => {
        // Process the data from the API and format it as needed
        const formattedData = ticketCounts.map((item) => ({
          name: item._id,
          value: item.tickets,
        }));

        setChartData(formattedData);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <PieChart width={600} height={400}> {/* Adjust width and height here */}
      <Pie
        data={chartData}
        dataKey="value"
        cx={300} // Adjust the center x-coordinate if necessary
        cy={200} // Adjust the center y-coordinate if necessary
        labelLine={false}
        // label={renderCustomizedLabel}
        outerRadius={100} // Adjust the outer radius as needed
        fill="#8884d8"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CustomPieChart;
