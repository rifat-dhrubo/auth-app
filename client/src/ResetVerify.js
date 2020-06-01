import React, { useState, useEffect, useContext } from 'react';
import { useParams, navigate } from '@reach/router';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';
import { grey } from './utils/colors';
import verify from './assets/throw.svg';
import { Log, Content } from './utils/FormComponent';
import { AuthContext } from './AuthContext';

const Login = () => {
  const { register, handleSubmit, errors, getValues } = useForm({});
  const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const alert = useAlert();
  const { token } = useParams();

  const onSubmit = async (data) => setFormData(data);

  useEffect(() => {
    if (Number(token.length) < 50) {
      navigate('/login');
      return;
    }
    if (Object.keys(formData).length === 0) return;
    // encoding data for sending to server
    const encodedData = JSON.stringify({ token, ...formData });
    console.log(encodedData);
    // making request to the register endpoint at server
    async function setData() {
      await fetch('/api/v1/forgot/verify', {
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
          if (response.status === 422) {
            alert.error('Password do not match');
          }
          return response.json();
        })
        .then((response) => {
          console.log(response);
          if (response.isLoggedIn === true) {
            localStorage.setItem('auth-app', `${response.token}`);
            setCurrentUser(response.data);
            setIsLoggedIn(true);
            alert.success('Your password has been updated');
            navigate('/info');
          }
        });
    }

    setData();
  }, [alert, formData, setCurrentUser, setIsLoggedIn, token]);

  return (
    <Wrapper>
      <Log>
        <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
          <h1>Reset your password</h1>

          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              ref={register({
                required: 'You must specify a password',
                minLength: {
                  value: 6,
                  message: 'The password must be 6 characters or more',
                },
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

          <label htmlFor="passwordConfirm">
            Confirm Password
            <input
              type="password"
              name="passwordConfirm"
              ref={register({
                required: 'You must specify the confirm Password',

                validate: (value) => {
                  const message = 'confirm password do not match the password';
                  const password = getValues('password');
                  if (value === password) return true;
                  return message;
                },
              })}
            />
          </label>

          {errors.passwordConfirm && (
            <p className="error">{errors.passwordConfirm.message}</p>
          )}

          <input className="submit" type="submit" />
        </form>
      </Log>
      <Content>
        <img src={verify} alt="logging" />
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
