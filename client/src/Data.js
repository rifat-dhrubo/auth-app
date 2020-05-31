import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { black, turquoise, lightBlack, grey } from './utils/colors';

const Data = ({ data }) => {
  const { name, email, phone } = data;
  return (
    <Card>
      <div className="title">
        <h2>Name: {name}</h2>
      </div>
      <div className="info">
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
      </div>
    </Card>
  );
};
Data.propTypes = {
  data: PropTypes.object.isRequired,
};

const Card = styled.div`
  padding: 10px;
  min-height: 200px;
  flex-basis: 15%;
  margin: 10% 1%;
  color: ${grey};
  background: ${lightBlack};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  transition: 0.18s all ease;
  border: 1px solid ${lightBlack};

  &:hover {
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
  }

  & .title {
    color: ${turquoise};
  }
`;

export default Data;
