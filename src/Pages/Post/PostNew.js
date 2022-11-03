import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import { UserContext } from '../../hooks/UserContext';
import config from '../../config.json'
import '../../App.css';
import authHeader from '../../services/auth-header';

export default function PostNew() {
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

	const handleSubmit = (title, url, content, user) => {
		axios.post(`${config.BACKEND_URL}/posts`, {
				title: title,
				url: url,
        content: content,
				author: authUser.id,
    }, { headers: authHeader() })
    .then(res => {
      navigate("/posts")
    })
    .catch(err => {
      console.error(err.message)
    })
	};

	return (
		<div className='w-1/2'>
			<h1>New Post</h1>
			<ValidatedForm submit={(title, content, url, user) => handleSubmit(title, content, url, user)}/>
		</div>
	)
}
