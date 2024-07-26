// App.js (React)
import React, { useEffect, useState } from 'react';

function Prueba() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setData(receivedData);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
    <h1>Sensor Data</h1>
    {data ? (
      <div>
        <p>Ambient Temperature: {data.temperature.ambient}°C</p>
        <p>Object Temperature: {data.temperature.object}°C</p>
        <p>Heart Rate: {data.heart_rate}</p>
        <p>SpO2: {data.spo2}</p>
        <p>Pulse: {data.pulse}</p>
      </div>
    ) : (
      <p>No data received yet</p>
    )}
  </div>
  );
}

export default Prueba;
