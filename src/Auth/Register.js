import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import useAuth from '../hooks/useAuth'

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  const { error, registerUser } = useAuth();

	const handleSubmit = () => {
		registerUser({ username, email, password })
    // navigate('/')
	};

	return (
		<div className='w-1/2'>
			<h1>Sign Up</h1>
			<Stack spacing={3} className="mt-3">
        {error &&
          <div style={{color: "red"}}>{error}</div>
        }
        <input
          type='text'
          className='border border-black w-full'
					placeholder='username'
          onChange={(e)=>setUsername(e.target.value)}
          size="small"
        />
        <input
          type='text'
          className='border border-black w-full'
					placeholder='email'
          onChange={(e)=>setEmail(e.target.value)}
          size="small"
        />
        <input
          type='password'
          className='border border-black w-full'
					placeholder='password'
          onChange={(e)=>setPassword(e.target.value)}
        />
        {/* Submit */}
        <button 
          className='border border-black'
          onClick={handleSubmit}
        >sign up</button>
      </Stack>
		</div>
	)
}
