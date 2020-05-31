import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { navigate } from '@reach/router';
import { useAlert } from 'react-alert';
import { grey } from './utils/colors';
import reset from './assets/reset.svg';
import { Log, Content } from './utils/FormComponent';

const Reset = () => {
  const { register, handleSubmit, errors } = useForm({});
  const [formData, setFormData] = useState({});
  const firstRender = useRef(false);
  const alert = useAlert();
  const ref = useRef(null);
  const onSubmit = (data) => setFormData(data);

  useLayoutEffect(() => {
    if (firstRender.current === false) {
      firstRender.current = true;
      return;
    }

    // encoding data for sending to server
    const encodedData = JSON.stringify(formData);
    console.log(encodedData);

    // making request to the register endpoint at server
    async function setData() {
      ref.current.style.cursor = 'progress';
      await fetch('/api/v1/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: encodedData,
      })
        .then((response) => {
          console.log(response);
          if (response.status > 400) {
            alert.error('Wrong email or password');
          }
          return response.json();
        })
        .then((response) => {
          ref.current.style.cursor = 'default';
          console.log(response);
          if (response.data) {
            return alert.success('An email has been sent to you');
          }
          return alert.error('Wrong email or password');
        });
    }
    setData();
  }, [alert, formData]);

  return (
    <Wrapper ref={ref}>
      <Log>
        <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
          <h1>Reset your password </h1>
          <label htmlFor="mail">
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

          <input
            className="submit"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </Log>
      <Content>
        <img src={reset} alt="logging" />
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

export default Reset;
