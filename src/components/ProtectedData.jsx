import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../api';

const ProtectedData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchWithAuth('https://your-api-endpoint.com/protected-data');
        setData(result);
      } catch (error) {
        setError('Failed to fetch protected data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Protected Data</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default ProtectedData;
