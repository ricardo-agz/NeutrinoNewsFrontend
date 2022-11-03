import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import useApi from '../../hooks/useApi';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function CommentEdit() {
	const { id } = useParams();
  const { result: comment, loading, error, refresh } = useApi(`http://localhost:8080/comments/${id}`);
  const navigate = useNavigate();

	const handleSubmit = (content, author, post) => {
    axios.put(`http://localhost:8080/comments/${id}/edit`, 
    {
				content: content,
				author: author,
				post: post,
    }, { headers: authHeader() })
    .then(res => {
      navigate(`/comments/${id}`)
    })
    .catch(err => {
      alert(err)
    });
	};

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (loading || !comment) {
		return <div>Loading...</div>;
	} else {
		return (
			<div className='container'>
				<h1>Edit Comment</h1>
				<ValidatedForm submit={(content, author, post) => handleSubmit(content, author, post)} model={comment}/>
			</div>
		)
	}
}
