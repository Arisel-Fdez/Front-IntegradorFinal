// src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import Cards from '../components/Cards';
import grafica from '../assets/grafica.svg';

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState({ Object: 'N/A', RitCardiaco: 'N/A', Spo: 'N/A', Pulso: 'N/A' });
  const [chartData, setChartData] = useState(Array(50).fill({ value: 0 }));

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      console.log("Data received from WebSocket:", receivedData);
      // Verificar y actualizar datos solo si no son "N/A"
      setData({
        Object: receivedData.Object !== 'N/A' ? receivedData.Object : data.Object,
        RitCardiaco: receivedData.RitCardiaco !== 'N/A' ? receivedData.RitCardiaco : data.RitCardiaco,
        Spo: receivedData.Spo !== 'N/A' ? receivedData.Spo : data.Spo,
        Pulso: receivedData.Pulso !== 'N/A' ? receivedData.Pulso : data.Pulso
      });
      if (receivedData.Pulso === '0' || receivedData.Pulso === '1') {
        const pulsoValue = parseInt(receivedData.Pulso, 10); // Convert to number
        console.log("Pulso value received:", pulsoValue);
        updateChartData(pulsoValue);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, [data]);

  const updateChartData = (newValue) => {
    setChartData(prevData => {
      const newData = [...prevData, { value: newValue }];
      newData.shift(); // Remove the oldest value to maintain the length
      return newData;
    });
  };

  return (
    <>
      <section className="w-[96%] mx-auto max-w-screen-xl mt-7 pb-5">

        <div className="grid grid-cols-2 gap-2">
          <Cards
            onClick={() => navigate('/Infrared')}
            event="Infrared Temperature"
            nota={data.Object !== 'N/A' ? `${data.Object}°` : 'No data yet'}
            last="a moment ago"
          />

          <Cards
            onClick={() => navigate('/Heart')}
            event="Heart Rate"
            nota={data.RitCardiaco !== 'N/A' ? `${data.RitCardiaco} bpm` : 'No data yet'}
            last="a moment ago"
          />

          <Cards
            onClick={() => navigate('/Viriability')}
            event="Heart Rate Spo"
            nota={data.Spo !== 'N/A' ? `${data.Spo} ms` : 'No data yet'}
            last="a moment ago"
          />
        </div>

        <div className="w-full flex items-center justify-center mt-5 ">
          <LineChart width={800} height={400} data={chartData}>
            <XAxis />
            <YAxis domain={[0, 1]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#ff0000" dot={false} isAnimationActive={false} />
          </LineChart>
        </div>
      </section>
    </>
  );
}

export default Home;
