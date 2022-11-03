import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';

export default function PrivateRoute({ component }) {
  const [loading, setLoading] = useState(true);
  const { authUser } = useContext(UserContext);

  useEffect(() => {
    setLoading(false)
  }, [authUser])

  if (authUser) return component
  else if (loading) return <div>loading ...</div>
  else return <Navigate to="/login" />
}