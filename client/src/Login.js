import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Link, navigate } from '@reach/router';
import { useAlert } from 'react-alert';
import { grey } from './utils/colors';
import enter from './assets/enter.svg';
import { Log, Content } from './utils/FormComponent';
import { AuthContext } from './AuthContext';

const Login = () => {
  const { register, handleSubmit, errors } = useForm({});
  const [formData, setFormData] = useState({});
  // const firstRender = useRef(true);
  const alert = useAlert();
  const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext);

  const onSubmit = async (data) => setFormData(data);

  useEffect(() => {
    // // checking if user is authenticated if so canceling request
    if (localStorage.getItem('auth-app') != null) {
      setTimeout(() => {
        navigate('info');
        alert.info('You are already logged in');
      }, 1000);

      return;
    }

    if (Object.keys(formData).length === 0) return;

    // encoding data for sending to server
    const encodedData = JSON.stringify(formData);

    // making request to the register endpoint at server
    async function setData() {
      await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: encodedData,
      })
        .then((response) => {
          console.log(response);
          if (response.status === 401) {
            alert.error('Wrong email or password');
          }
          return response.json();
        })
        .then((response) => {
          if (response.isLoggedIn === true) {
            localStorage.setItem('auth-app', `${response.token}`);
            setCurrentUser(response.data);
            setIsLoggedIn(true);
            navigate('info');
          }
        });
    }

    setData();
  }, [alert, formData, setCurrentUser, setIsLoggedIn]);

  return (
    <Wrapper>
      <Log>
        <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
          <h1>Log in to your account</h1>
          <label htmlFor="mail">
            Email
            <input
              type="text"
              name="email"
              ref={register({
                required: 'You must specify an email',
                pattern: /^\S+@\S+$/i,
              })}
            />
          </label>

          {errors.email && <p className="error">You must specify an email</p>}

          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              ref={register({
                required: 'You must specify a password',
                min: 6,
                validate: (value) => {
                  const message =
                    'Password must contain at least one letter, at least one number, and be longer than six characters';
                  const regex = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/i;
                  if (regex.test(value)) {
                    return true;
                  }
                  return message;
                },
              })}
            />
          </label>

          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <input
            className="submit"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
          <p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?{' '}
            <Link className="link" to="/register">
              Sign up
            </Link>
          </p>
          <p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Forgot Password?{' '}
            <Link className="link" to="/reset">
              Reset Password
            </Link>
          </p>
        </form>
      </Log>
      <Content>
        <img src={enter} alt="logging" />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${grey};
  display: flex;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;

export default Login;
