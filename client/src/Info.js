/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { navigate } from '@reach/router';
import { useAlert } from 'react-alert';
import { black, grey } from './utils/colors';
import Data from './Data';

const Info = () => {
  const [allUserData, setAllUserData] = useState([]);
  const alert = useAlert();

  useEffect(
    function loadProductData() {
      if (localStorage.getItem('auth-app') == null) {
        alert.error(' You must log in to view this');
        navigate('login');
      }
      async function fetchData() {
        const data = await fetch('api/v1/user').then((response) =>
          response.json()
        );

        setAllUserData(data.user);
      }

      fetchData();
    },
    [alert]
  );

  return (
    <Wrapper>
      <Row>
        {allUserData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {allUserData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {allUserData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {allUserData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {allUserData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {allUserData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {allUserData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
        {allUserData.map((data) => {
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
