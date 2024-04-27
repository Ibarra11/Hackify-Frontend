// import { API_URL } from '../environment';
const API_URL = 'http://localhost:3000'

// interface AuthRequestBody {
//   username: string;
//   password: string;
//   userIsAdmin?: boolean;
// }

export const registerUser = async (body) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  return data;
}

export const LogIn = async (body) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  return data;
}