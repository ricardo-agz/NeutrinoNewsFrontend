import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Users from './Pages/User/Users';
import UserShow from './Pages/User/UserShow';
import UserEdit from './Pages/User/UserEdit';
import Posts from './Pages/Post/Posts';
import PostNew from './Pages/Post/PostNew';
import PostShow from './Pages/Post/PostShow';
import PostEdit from './Pages/Post/PostEdit';
import Comments from './Pages/Comment/Comments';
import CommentNew from './Pages/Comment/CommentNew';
import CommentShow from './Pages/Comment/CommentShow';
import CommentEdit from './Pages/Comment/CommentEdit';
import { UserContext } from './hooks/UserContext';
import useFindUser from './hooks/useFindUser';
import PrivateRoute from './Auth/PrivateRoute';import Login from './Auth/Login';
import Nav from './Components/Nav'
import './App.css';
import Register from "./Auth/Register";

function App() {
	const { user, setUser } = useFindUser();

  return (
    <div className="w-full h-screen flex justify-center">
    <UserContext.Provider value={{ authUser: user, setAuthUser: setUser }} >
    <div className="lg:w-3/4 w-11/12 m-3 bg-[#f6f6ef] justify-start">
			<Nav/>
      <div className="p-5">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* AUTH */}
          <Route path='/login' element={<Login />} />

          {/* User */}
          <Route path='/users/:id' element={<UserShow />} />
          <Route path='/users' element={<Users />} />
          <Route path='/register' element={<Register />} />
          <Route path='/users/:id/edit' element={<UserEdit />} />

          {/* Post */}
          <Route path='/posts/:id' element={<PostShow />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/posts/new' element={<PostNew />} />
          <Route path='/users/:id/posts/new' element={<PostNew />} />
          <Route path='/posts/:id/edit' element={<PostEdit />} />

          {/* Comment */}
          <Route path='/comments/:id' element={<CommentShow />} />
          <Route path='/comments' element={<Comments />} />
          <Route path='/comments/new' element={<CommentNew />} />
          <Route path='/posts/:id/comments/new' element={<CommentNew />} />
          <Route path='/comments/:id/edit' element={<CommentEdit />} />
        </Routes> 
      </div>
       
    </div>
		</UserContext.Provider>
    </div>
  );
}

export default App;
