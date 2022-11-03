import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from './Comment'
import useApi from '../../hooks/useApi';
import authHeader from '../../services/auth-header';
import { UserContext } from '../../hooks/UserContext';
import config from '../../config.json'
import '../../App.css';

export default function CommentShow(props) {
  const { id } = useParams();
  const { authUser } = useContext(UserContext);
  const [replyContent, setReplyContent] = useState('')
  
  const navigate = useNavigate();
  const { result: comment, loading, error, refresh } = useApi(`http://localhost:8080/comments/${id}`);
  const { result: replies, repliesLoading, repliesError, repliesRefresh } = useApi(`${config.BACKEND_URL}/comments/${id}/replies`);


  function handleDelete() {
    axios.delete(`${config.BACKEND_URL}/comments/${id}`, { headers: authHeader() });
    navigate('/posts');
  }

  function handleAddReply() {
    if (replyContent.trim() !== '') {
      axios.post(`${config.BACKEND_URL}/comments/${comment._id}/create-reply`, {
        content: replyContent,
        user: authUser.id,
        post: comment.post,
      }, { headers: authHeader() })
      .then(r => {
        setReplyContent('loading...')
      })
      .catch(e => {
        setReplyContent(`failure to comment:/ ${e}`)
      })
      .finally(r => {
        setReplyContent('')
        refresh()
        repliesRefresh()
      })
    }
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading || !comment) {
    return <div>loading...</div>;
  } else {
    return (
      <div className='flex flex-col'>
        <div className='row'>
          <h1 className='font-bold flex-1'>{comment.content}</h1>
          { comment.user === authUser.id &&
            <button 
              className='border border-black w-20 bg-red-200'
              onClick={handleDelete}
            >delete
            </button>
          }
        </div>

        <textarea 
          className='border border-black w-1/2 h-20 mt-3 mb-3'
          onChange={(e) => setReplyContent(e.target.value)}
          value={replyContent}
        />
        <button 
          className='border border-black w-32'
          onClick={handleAddReply}
        >add reply
        </button>

        <label className='mt-5 font-bold'>comments</label>

				<div className=''>
          {replies && replies.length > 0 
          ? <ul>
					{replies && replies.map((c, i) => (
            <li className='list-decimal ml-5'><Comment commentData={c} /></li>
					))}
					</ul> 
          :
          <div className='text-xs'>this comment has no replies...</div>
          }
					
				</div>

      </div>
    );
  }
}
