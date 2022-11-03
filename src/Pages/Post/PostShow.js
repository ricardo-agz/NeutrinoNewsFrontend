import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, CircularProgress, TextField } from '@mui/material';
import Comment from '../Comment/Comment'
import useApi from '../../hooks/useApi';
import authHeader from '../../services/auth-header';
import { UserContext } from '../../hooks/UserContext';
import config from '../../config.json'
import '../../App.css';

export default function PostShow(props) {
  const { id } = useParams();
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { result: post, loading, error, refresh } = useApi(`${config.BACKEND_URL}/posts/${id}`);
  const [comment, setComment] = useState('')

  function handleDelete() {
    axios.delete(`${config.BACKEND_URL}/posts/${id}`, { headers: authHeader() });
    navigate('/posts');
  }

  function handleAddComment() {
    if (comment.trim() !== '') {
      axios.post(`${config.BACKEND_URL}/comments`, {
        content: comment,
        post: post._id,
        user: authUser.id
      }, { headers: authHeader() })
      .then(r => {
        setComment('loading...')
      })
      .catch(e => {
        setComment(`failure to comment:/ ${e}`)
      })
      .finally(r => {
        setComment('')
        refresh()
      })
    }
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
  } else if (loading || !post) {
    return <CircularProgress />;
  } else {
    return (
      <div className='flex flex-col'>
        <div className='row'>
          <h1 className='font-bold mr-3'>{post.title}</h1>

          <button 
            onClick={() => handleClickLike(post)}
            className='p-1'
          >[{post.likedBy.length}] 
            {!post.likedBy.some(u => u === authUser.id) 
              ? '✊'
              : '👍'
            }
          </button>

          <div className='flex-1'/>

          { post.author === authUser.id &&
            <button 
              className='border border-black w-20 mr-3'
              onClick={() => navigate(`/posts/${id}/edit`)}
            >edit
            </button>
          }
          { post.author === authUser.id &&
            <button 
              className='border border-black w-20 bg-red-200'
              onClick={handleDelete}
            >delete
            </button>
          }
        </div>

				<a href={`http://${post.url}`}>({post.url})</a>
				<label>{post.content}</label>

        <textarea 
          className='border border-black w-1/2 h-20 mt-3 mb-3'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button 
          className='border border-black w-32'
          onClick={handleAddComment}
        >add comment
        </button>

        <label className='mt-5 font-bold'>comments</label>

				<div className=''>
          {post.comments && post.comments.length > 0 
          ? <ul className='ml-5'>
					{post.comments && post.comments.map((comment, i) => !comment.replyTo && (
						<li className='list-decimal'><Comment commentData={comment} /></li>
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
