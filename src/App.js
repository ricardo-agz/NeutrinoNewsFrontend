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
          <Route path='/register' element={<Register />} />

          {/* User */}
          <Route
            path="/users/:id"
            element={<PrivateRoute component={<UserShow />} />}
          />
          <Route
            path="/users/:id/edit"
            element={<PrivateRoute component={<UserEdit />} />}
          />

          {/* Post */}
          <Route path='/posts' element={<Posts />} />
          <Route
            path="/posts/:id"
            element={<PrivateRoute component={<PostShow />} />}
          />
          <Route
            path="/posts/new"
            element={<PrivateRoute component={<PostNew />} />}
          />
          <Route
            path="/posts/:id/posts/new"
            element={<PrivateRoute component={<PostNew />} />}
          />
          <Route
            path="/posts/:id/edit"
            element={<PrivateRoute component={<PostEdit />} />}
          />

          {/* Comment */}
          <Route
            path="/comments/:id"
            element={<PrivateRoute component={<CommentShow />} />}
          />
          <Route
            path="/comments/:id/edit"
            element={<PrivateRoute component={<CommentEdit />} />}
          />
        </Routes> 
      </div>
       
    </div>
		</UserContext.Provider>
    </div>
  );
}

export default App;
