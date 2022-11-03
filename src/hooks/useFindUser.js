import { useState, useEffect } from 'react';

export default function useFindUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
      setUser(auth)
    }
  }, []);

  return {
    user,
    setUser
  }
}
