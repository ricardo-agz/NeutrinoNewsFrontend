import React from 'react';
import { useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function CommentNew() {
  const navigate = useNavigate();

	const handleSubmit = (content, author, post) => {
		axios.post('http://localhost:8080/comments', {
				content: content,
				author: author,
				post: post,
    })
    .then(res => {
      navigate("/comments")
    })
    .catch(err => {
      alert(err)
    })
	};

	return (
		<div className='container'>
			<h1>New Comment</h1>
			<ValidatedForm submit={(content, author, post) => handleSubmit(content, author, post)}/>
		</div>
	)
}
