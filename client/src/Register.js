import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { navigate } from '@reach/router';
import { useAlert } from 'react-alert';
import { grey } from './utils/colors';
import registerSvg from './assets/registerSvg.svg';
import { Log, Content } from './utils/FormComponent';

const Register = () => {
  const { register, handleSubmit, errors, getValues } = useForm({});
  const [formData, setFormData] = useState({});

  const alert = useAlert();
  const onSubmit = (data) => {
    setFormData(data);
  };

  useEffect(() => {
    // checking if its the initial mount if so canceling request
    if (Object.keys(formData).length === 0) return;
    // encoding data for sending to server
    const encodedData = JSON.stringify(formData);

    // making request to the register endpoint at server
    async function setData() {
      await fetch('/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: encodedData,
      }).then(async (response) => {
        const res = await response.json();
        if (res.success === false) {
          alert.error('User with same credential Exists');
          return;
        }
        localStorage.setItem('auth-app', `${res.token}`);
        navigate('info');
      });
    }

    setData();
  }, [alert, formData]);

  return (
    <Wrapper>
      <Log>
        <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign up</h1>

          <label htmlFor="name">
            Name
            <input
              type="text"
              placeholder="name"
              name="name"
              ref={register({
                required: 'You must specify an name',
                minLength: {
                  value: 3,
                  message: 'The name must be 3 characters or more',
                },
              })}
            />
          </label>

          {errors.name && <p className="error">{errors.name.message}</p>}

          <label htmlFor="email">
            Email
            <input
              type="text"
              placeholder="email"
              name="email"
              ref={register({
                required: 'You must specify an email',
                pattern: /^\S+@\S+$/i,
              })}
            />
          </label>

          {errors.email && <p className="error">You must specify an email</p>}

          <label htmlFor="phone">
            Phone
            <input
              type="text"
              placeholder="phone"
              name="phone"
              ref={register({
                required: 'You must specify an phone number',
                minLength: {
                  value: 7,
                  message: 'The phone number must be 7 characters or more',
                },
                maxLength: {
                  value: 11,
                  message: 'The phone number must be less than 11 characters',
                },
              })}
            />
          </label>

          {errors.phone && (
            <p className="error">You must specify a phone number</p>
          )}

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
        <img src={registerSvg} alt="logging" />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${grey};
  display: flex;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;

export default Register;
