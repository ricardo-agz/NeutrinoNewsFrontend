import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import authHeader from '../../services/auth-header';
import { UserContext } from '../../hooks/UserContext';
import config from '../../config.json'
import '../../App.css';

export default function Comment({ commentData }) {
  const { authUser } = useContext(UserContext);
  const { result: replies, loading, error, refresh } = useApi(`${config.BACKEND_URL}/comments/${commentData._id}/replies`);

  return (
    <div>
      <a href={`/comments/${commentData._id}`}>{commentData.content}</a>
      <ul>
      {replies && 
        replies.map(comment => (
        <li className='list-decimal ml-5'>
          <Comment commentData={comment}/>
        </li>
      ))}
      </ul>
    </div>
  )
}