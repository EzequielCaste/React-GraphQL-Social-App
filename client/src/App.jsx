import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import AuthRoute from './util/AuthRoute';
import { AuthProvider } from './context/auth';

import MenuBar from './components/MenuBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import UserProfile from './pages/UserProfile';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route
              exact
              path="/"
              element={<Home />}
            />
            <Route
              exact
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              exact
              path="/register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
            <Route
              exact
              path="/posts/:postId"
              element={<SinglePost />}
            />
            <Route
              exact
              path="/posts/edit/:postId"
              element={<SinglePost edit={true} />}
            />
            <Route
              exact
              path="/user/:userId"
              element={
                <UserProfile />
              }
            />
          </Routes>
          <Footer />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
