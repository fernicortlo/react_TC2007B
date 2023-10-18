import React, { useEffect, useState } from 'react';

const Ticketscreados = () => {
  const [createdTicketCount, setCreatedTicketCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:1337/ticketscreados', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': localStorage.getItem("auth"),
      },
    })
      .then((response) => response.json())
      .then((ticketCounts) => {
        if (Array.isArray(ticketCounts) && ticketCounts.length > 0) {
          setCreatedTicketCount(ticketCounts[0].ticketsCreated);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <p style={{ fontSize: '50px' }}>
      {createdTicketCount}
    </p>
  );
};

export default Ticketscreados;