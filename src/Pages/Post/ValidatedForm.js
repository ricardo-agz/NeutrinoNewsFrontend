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
	const { id } = useParams();	
  const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
	const [user, setUser] = useState(id ? id : '');
  const [err, setErr] = useState(null)
  const [openErr, setOpenErr] = useState(false)

  useEffect(() => {
		if (props.model) {
      setTitle(props.model.title)
			setContent(props.model.content);
			setUrl(props.model.url);
			setUser(props.model.user);
		}
	}, [props.model]);

  const validate = () => {
		if (title !== '' && content !== '' && url !== '') {
			props.submit(title, url, content, user)
		} else {
      if (title === '') {
				setErr('title cannot be left blank')
			}
			else if (content === '') {
				setErr('content cannot be left blank')
			}
			else if (url === '') {
				setErr('url cannot be left blank')
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
					placeholder='title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
          type='text'
          className='border border-black w-full'
					placeholder='url'
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
				<textarea
          className='border border-black w-full h-20'
					placeholder='text'
					value={content}
					onChange={(e) => setContent(e.target.value)}
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