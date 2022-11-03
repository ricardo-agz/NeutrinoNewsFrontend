import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import authHeader from '../../services/auth-header';
import config from '../../config.json'
import { UserContext } from '../../hooks/UserContext';
import '../../App.css';
import Post from './Post';

export default function Posts() {
  const { result: posts, loading, error, refresh } = useApi(`${config.BACKEND_URL}/posts`);
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  function handleDelete(id) {
    axios.delete(`${config.BACKEND_URL}/posts/${id}`, { headers: authHeader() })
    window.location.reload();
  }

  function handleClickLike(post) {
    const variant = !post.likedBy.some(u => u === authUser.id) ? 'like' : 'unlike'
    axios.post(`${config.BACKEND_URL}/users/${authUser.id}/${variant}-post/${post._id}`, {}, {headers: authHeader()})
    .then(res => {
      refresh()
    })
    .catch(err => {
      
    })
    .finally(() => {
      
    })
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading || !posts) {
    return <div>loading...</div>;
  } else {
    return (
      <div className='pl-5'>

        <ol className='list-decimal'>
        {posts.map((post, i) => (
					<Post 
            key={i} 
            postData={post} 
            authUser={authUser} 
            handleClickLike={() => handleClickLike(post)}
          />
        ))}
        </ol>
      </div>
    )
  }
}
