import React, { useEffect, useState } from 'react';

const TicketsFinalizados = () => {
  const [finishedTicketCount, setFinishedTicketCount] = useState(0);

  useEffect(() => {
    fetch('https://localhost:1337/ticketsfin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': localStorage.getItem("auth"),
      },
    })
      .then((response) => response.json())
      .then((ticketCounts) => {
        if (Array.isArray(ticketCounts) && ticketCounts.length > 0) {
          setFinishedTicketCount(ticketCounts[0].ticketsFin);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <p style={{ fontSize: '50px' }}>
      {finishedTicketCount}
    </p>
  );
};

export default TicketsFinalizados;
