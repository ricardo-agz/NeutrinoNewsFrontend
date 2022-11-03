import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, CircularProgress } from '@mui/material';
import useApi from '../../hooks/useApi';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function Comments() {
  const { result: comments, loading, error, refresh } = useApi("http://localhost:8080/comments");
  const navigate = useNavigate();

  function handleDelete(id) {
    axios.delete(`http://localhost:8080/comments/${id}`, { headers: authHeader() })
    window.location.reload();
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading || !comments) {
    return <CircularProgress />;
  } else {
    return (
      <div className='container'>
        <h1>Comments</h1>
        <Button variant={"contained"} onClick={() => navigate("/comments/new")}>new comment</Button>

        <ul>
        {comments.map((comment, i) => (
          <div className="listItem" key={i}>
					<li key={i}>{comment.content}</li>
            <ButtonGroup variant="outlined" size="small">
              <Button onClick={() => navigate(`/comments/${comment._id}`)}>show</Button>
              <Button onClick={() => navigate(`/comments/${comment._id}/edit`)}>edit</Button>
              <Button color="error" onClick={() => handleDelete(comment._id)}>delete</Button>
            </ButtonGroup>
          </div>
        ))}
        </ul>
      </div>
    )
  }
}
