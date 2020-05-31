import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useAlert } from 'react-alert';
import { navigate } from '@reach/router';
import { black, grey } from './utils/colors';
import Data from './Data';

const Info = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const alert = useAlert();

  useEffect(
    function isUserLoggedIn() {
      async function fetchData() {
        const token = localStorage.getItem('auth-app');
        await fetch('/api/v1/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
          .then((response) => {
            if (response.status === 401) {
              alert.error('Your are not logged in');
              navigate('login');
            }
            return response.json();
          })
          .then((response) => {
            if (response.isLoggedIn === true) {
              setIsLoggedIn(true);
              alert.success('You are now logged in');
            }
          });
      }
      if (!isLoggedIn) fetchData();
    },
    [alert, isLoggedIn]
  );

  useEffect(function loadProductData() {
    async function fetchData() {
      const data = await fetch('api/v1/user').then((response) =>
        response.json()
      );

      setUserData(data.user);
    }

    fetchData();
  }, []);

  return (
    <Wrapper>
      <Row>
        {userData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {userData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {userData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {userData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {userData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {userData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {userData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {userData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 94vh;
  background: ${black};
  color: ${grey};
  overflow-x: hidden;
  min-height: 100vh;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
export default Info;
