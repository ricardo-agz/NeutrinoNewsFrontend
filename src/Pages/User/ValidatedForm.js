import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import {
  Snackbar,
  TextField,
  Button,
  Checkbox,
  Stack
} from '@mui/material'

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ValidatedForm(props) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  const [err, setErr] = useState(null)
  const [openErr, setOpenErr] = useState(false)

  useEffect(() => {
		if (props.model) {
			setUsername(props.model.username);
			setEmail(props.model.email);
		}
	}, [props.model]);

  const validate = () => {
		if (username !== '' && email !== '' && password !== '') {
			props.submit(username, email, password, username, email, password)
		} else {
			if (username === '') {
				setErr('username cannot be left blank')
			}
			else if (email === '') {
				setErr('email cannot be left blank')
			}
			else if (password === '') {
				setErr('password cannot be left blank')
			}
      setOpenErr(true)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErr(false);
  };

  return (
    <div className='mt-3'>
      <Stack spacing={3}>
				<input
          type='text'
          className='border border-black w-full'
					placeholder='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
          type='text'
          className='border border-black w-full'
					placeholder='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
          type='PASSWORD'
          className='border border-black w-full'
					placeholder='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
        <button 
          className='border border-black'
          onClick={validate}>submit</button>
      </Stack>

      <Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {err}
        </Alert>
      </Snackbar>
    </div>
  )
}