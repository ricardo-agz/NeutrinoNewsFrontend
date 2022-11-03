import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import useAuth from '../hooks/useAuth';
import useApi from '../hooks/useApi';
import authHeader from '../services/auth-header';
import config from '../config.json'

export default function Nav() {
  const { authUser } = useContext(UserContext);
  const { result: user, loading, error, refresh } = useApi(`${config.BACKEND_URL}/users/${authUser && authUser.id}`);
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex bg-[#ff6600] h-7 w-full pl-5 pr-5">
      <div className='row flex-1'>
        <div 
          onClick={() => navigate(`/posts`)}
          className='cursor-pointer mr-5'>posts</div>
        <div 
          onClick={() => navigate(`/posts/new`)}
          className='cursor-pointer'>submit</div>        
      </div>

      {authUser ?
        <div className='row'>
          <div 
            onClick={() => navigate(`/users/${authUser.id}`)}
            className='cursor-pointer mr-5'>hi {user.username}</div>
          <div 
            onClick={logout}
            className='cursor-pointer'>logout</div>
        </div>
        :
        <div className='row'>
          <div className='cursor-pointer mr-5' onClick={() => navigate('login')}>login</div>
          <div className='cursor-pointer' onClick={() => navigate('register')}>register</div>
        </div>
      }
    </div>
  )
}