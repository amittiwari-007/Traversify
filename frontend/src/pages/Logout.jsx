import axios from 'axios';
import { json, redirect } from 'react-router-dom';

export async function loader() {
  const configuration = {
    method: 'get',
    url: `${import.meta.env.VITE_API_URL}api/v1/users/logout`,
    // withCredentials: true, 
  };

  try {
    await axios(configuration);
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    return redirect('/');
  } catch ({ response }) {
    const error = response.data;
    throw json({ message: error.message }, { status: error.status });
  }
}
