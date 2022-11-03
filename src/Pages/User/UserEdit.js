import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import useApi from '../../hooks/useApi';
import authHeader from '../../services/auth-header';
import config from '../../config.json'
import '../../App.css';

export default function UserEdit() {
	const { id } = useParams();
  const { result: user, loading, error, refresh } = useApi(`http://localhost:8080/users/${id}`);
  const navigate = useNavigate();

	const handleSubmit = (username, email, password) => {
    axios.put(`${config.BACKEND_URL}/users/${id}`, 
    {
				username: username,
				email: email,
				password: password,
    }, { headers: authHeader() })
    .then(res => {
      navigate(`/users/${id}`)
    })
    .catch(err => {
      alert(err)
    });
	};

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (loading || !user) {
		return <div>Loading...</div>;
	} else {
		return (
			<div className='w-1/2'>
				<h1>Edit User</h1>
				<ValidatedForm submit={(username, email, password) => handleSubmit(username, email, password)} model={user}/>
			</div>
		)
	}
}
