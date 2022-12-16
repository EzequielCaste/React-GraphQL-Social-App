import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

import { Button, Form } from 'semantic-ui-react';

function Login() {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',   
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData }}) {  
      context.login(userData);
      navigate('/');
    },
    onError(err){
      setErrors(err.graphQLErrors[0]?.extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback(){
    loginUser();
  }

  return (
    <div className='form-container'>
    <h1>Login</h1>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <Form.Input
          label="Username"
          type="text"
          placeholder="Username.."
          name="username"
          error={errors.username ? true : false}
          value={values.username}
          onChange={onChange}
        />        
        <Form.Input
          label="Password"
          type="password"
          placeholder="Password.."
          name="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        />
        
        <Button type='submit' primary>Login</Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
        <ul className="list">
          {Object.values(errors).map(value => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login(
    $username: String!   
    $password: String!
  ) {
    login(     
        username: $username
        password: $password
    ) {
      id
      email
      username
      createdAt
      photoURL
      token      
    }
  }
`;

export default Login;
