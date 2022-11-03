import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import useApi from '../../hooks/useApi';
import authHeader from '../../services/auth-header';
import config from '../../config.json'
import '../../App.css';

export default function PostEdit() {
	const { id } = useParams();
  const { result: post, loading, error, refresh } = useApi(`http://localhost:8080/posts/${id}`);
  const navigate = useNavigate();

	const handleSubmit = (content, link, user) => {
    axios.put(`${config.BACKEND_URL}/posts/${id}`, 
    {
				content: content,
				link: link,
				user: user,
    }, { headers: authHeader() })
    .then(res => {
      navigate(`/posts/${id}`)
    })
    .catch(err => {
      alert(err)
    });
	};

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (loading || !post) {
		return <div>Loading...</div>;
	} else {
		return (
			<div className='w-1/2'>
				<h1>Edit Post</h1>
				<ValidatedForm submit={(content, link, user) => handleSubmit(content, link, user)} model={post}/>
			</div>
		)
	}
}
