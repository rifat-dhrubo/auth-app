import React, { useState, useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';
import { navigate } from '@reach/router';
import { grey } from './utils/colors';
import update from './assets/update.svg';
import { Log, Content } from './utils/FormComponent';
import { AuthContext } from './AuthContext';

const Update = () => {
  const { register, handleSubmit, errors } = useForm({});
  const [formData, setFormData] = useState({});
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const alert = useAlert();
  const onSubmit = (data) => {
    setFormData(data);
  };

  useEffect(() => {
    if (Object.keys(formData).length === 0) return;
    // checking if user is authenticated if not canceling request
    if (localStorage.getItem('auth-app') == null) {
      setTimeout(() => {
        navigate('login');
        alert.info('You must be logged in to update');
      }, 1000);

      return;
    }

    const token = localStorage.getItem('auth-app');
    console.log('running');
    // encoding data for sending to server
    const encodedData = JSON.stringify(formData);

    // making request to the update endpoint at server
    function setData() {
      fetch('/api/v1/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: encodedData,
      }).then(async (response) => {
        const res = await response.json();
        if (!res.data) {
          alert.error('OOps, something went wrong');
          return;
        }
        setCurrentUser(res.data);
        alert.success('Information Updated');
      });
    }

    setData();
  }, [alert, formData, setCurrentUser]);

  return (
    <Wrapper>
      <Log>
        <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
          <h1>Update Information</h1>

          <label htmlFor="name">
            Name
            <input
              type="text"
              placeholder={currentUser.name}
              name="name"
              ref={register({
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
              placeholder={currentUser.email}
              name="email"
              ref={register({
                pattern: /^\S+@\S+$/i,
              })}
            />
          </label>

          {errors.email && <p className="error">{errors.email.message}</p>}

          <label htmlFor="phone">
            Phone
            <input
              type="text"
              name="phone"
              placeholder={currentUser.phone}
              ref={register({
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

          {errors.phone && <p className="error">{errors.phone.message}</p>}

          <input className="submit" type="submit" />
        </form>
      </Log>
      <Content>
        <img src={update} alt="logging" />
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

export default Update;
