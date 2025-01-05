import axios from 'axios';

// Crea un'istanza di axios con configurazione personalizzata
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor per gestire gli errori
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestione degli errori comune
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
