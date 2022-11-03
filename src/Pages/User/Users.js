import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, CircularProgress } from '@mui/material';
import useApi from '../../hooks/useApi';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function Users() {
  const { result: users, loading, error, refresh } = useApi("http://localhost:8080/users");
  const navigate = useNavigate();

  function handleDelete(id) {
    axios.delete(`http://localhost:8080/users/${id}`, { headers: authHeader() })
    window.location.reload();
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading || !users) {
    return <CircularProgress />;
  } else {
    return (
      <div className='container'>
        <h1>Users</h1>
        <Button variant={"contained"} onClick={() => navigate("/users/new")}>new user</Button>

        <ul>
        {users.map((user, i) => (
          <div className="listItem" key={i}>
					<li key={i}>{user.username}</li>
            <ButtonGroup variant="outlined" size="small">
              <Button onClick={() => navigate(`/users/${user._id}`)}>show</Button>
              <Button onClick={() => navigate(`/users/${user._id}/edit`)}>edit</Button>
              <Button color="error" onClick={() => handleDelete(user._id)}>delete</Button>
            </ButtonGroup>
          </div>
        ))}
        </ul>
      </div>
    )
  }
}
