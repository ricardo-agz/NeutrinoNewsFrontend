import React, { useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, CircularProgress, TextField } from '@mui/material';
import useApi from '../../hooks/useApi';
import authHeader from '../../services/auth-header';
import { UserContext } from '../../hooks/UserContext';
import '../../App.css';
import Post from '../Post/Post';
import config from '../../config.json'

export default function UserShow(props) {
  const { id } = useParams();
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { result: user, loading, error, refresh } = useApi(`http://localhost:8080/users/${id}`);

  function handleDelete() {
    axios.delete(`http://localhost:8080/users/${id}`, { headers: authHeader() });
    navigate('/users');
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
  } else if (loading || !user) {
    return <div>loading...</div>;
  } else {
    return (
      <div className=''>
        <div className='row'>
          <h1 className='flex-1 font-bold'>{user.username}</h1>

          { id === authUser.id &&
            <button 
              className='border border-black w-20 mr-3'
              onClick={() => navigate(`/users/${id}/edit`)}
            >edit
            </button>
          }
          { id === authUser.id &&
            <button 
              className='border border-black w-20 bg-red-200'
              onClick={handleDelete}
            >delete
            </button>
          }
        </div>

        <label className='mt-10 font-bold'>posts</label>

				<div className=''>
          {user.posts && user.posts.length > 0 
          ? <ul className='ml-5'>
					{user.posts && user.posts.map((post, i) => (
						<Post postData={post} authUser={authUser} handleClickLike={() => handleClickLike(post)}/>
					))}
					</ul> 
          :
          <div className='text-xs'>this post has no comments...</div>
          }
					
				</div>
      </div>
    );
  }
}
