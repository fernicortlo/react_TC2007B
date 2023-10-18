import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomPieChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/problemaTickets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': localStorage.getItem("auth"),
      },
    })
      .then((response) => response.json())
      .then((ticketCounts) => {
        const formattedData = ticketCounts.map((item) => ({
          name: item._id,
          value: item.tickets,
        }));

        setChartData(formattedData);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <PieChart width={600} height={400}> 
      <Pie
        data={chartData}
        dataKey="value"
        cx={300} 
        cy={200} 
        labelLine={false}
        // label={renderCustomizedLabel}
        outerRadius={100} 
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


// const CustomPieChart = ({ chartData }) => {
//   return (
//     <PieChart width={600} height={400}>
//       <Pie
//         data={chartData}
//         dataKey="value"
//         cx={300}
//         cy={200}
//         labelLine={false}
//         outerRadius={100}
//         fill="#8884d8"
//       >
//         {chartData.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//       <Tooltip />
//       <Legend />
//     </PieChart>
//   );
// };

// export default CustomPieChart;