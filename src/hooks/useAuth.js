import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import config from '../config.json'

export default function useAuth() {
  const navigate = useNavigate();
  const { setAuthUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const setUserContext = () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
      setAuthUser(auth.user);
      navigate('../');
    }
  }

  // login
  const login = (username, password) => {
    setError(null);
    axios.post(`${config.BACKEND_URL}/auth/login`, {
      username: username,
      password: password
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("auth", JSON.stringify(res.data));
        setUserContext();
      }
      return res.data;
    })
    .catch((err) => {
      setError(err.response.data.message);
    });
  }

  // logout
  const logout = () => {
    localStorage.removeItem('auth');
    setAuthUser(null);
    navigate('/');
  }

  // register user
  const registerUser = async (data) => {
    const { username, email, password } = data;
    setLoading(true)
    setError(false)
    return axios.post(`${config.BACKEND_URL}/auth/register`, {
      username, email, password
    })
    .then(res => {
      setUserContext();
    })
    .catch(err => {
      setError(err.response.data.message);
    })
    .finally(() => {
      setLoading(false)
    })
  };

  return {
    login,
    logout,
    registerUser,
    error,
    success,
    loading,
  }
}