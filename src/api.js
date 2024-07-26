export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
  
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };
  
    const response = await fetch(url, { ...options, headers });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    return response.json();
  };
  