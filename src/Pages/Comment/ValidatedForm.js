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
	const [content, setContent] = useState('');
	const [author, setAuthor] = useState('');
	const [post, setPost] = useState(id ? id : '');
  const [err, setErr] = useState(null)
  const [openErr, setOpenErr] = useState(false)

  useEffect(() => {
		if (props.model) {
			setContent(props.model.content);
			setAuthor(props.model.author);
			setPost(props.model.post);
		}
	}, [props.model]);

  const validate = () => {
		if (content !== '' && author !== '' && post !== '') {
			props.submit(content, author, post)
		} else {
			if (content === '') {
				setErr('content cannot be left blank')
			}
			else if (author === '') {
				setErr('author cannot be left blank')
			}
			else if (post === '') {
				setErr('post cannot be left blank')
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
    <div className='container'>
      <Stack spacing={3}>
				<TextField
					label='content' size='small' type='String'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<TextField
					label='author' size='small' type='String'
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/>
				<TextField
					label='post' size='small' type='String'
					value={post}
					onChange={(e) => setPost(e.target.value)}
				/>
        <Button variant="contained" onClick={validate}>Submit</Button>
      </Stack>

      <Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {err}
        </Alert>
      </Snackbar>
    </div>
  )
}