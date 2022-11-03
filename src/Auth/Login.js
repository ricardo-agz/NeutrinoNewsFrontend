import React, { useState } from 'react'
import { Stack } from '@mui/material';
import useAuth from '../hooks/useAuth'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth();

  return (
    <div className='w-1/2'>
      <h1>Login</h1>
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
          type='password'
          className='border border-black w-full'
					placeholder='password'
          onChange={(e)=>setPassword(e.target.value)}
        />
        {/* Submit */}
        <button 
          className='border border-black'
          onClick={() => login(username, password)}
        >login</button>
      </Stack>
    </div>
  )
}