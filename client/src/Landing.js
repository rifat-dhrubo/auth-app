import React from 'react';
import styled from '@emotion/styled';
import { Link, navigate } from '@reach/router';
import { useAlert } from 'react-alert';
import { black, grey, turquoise } from './utils/colors';

function Landing() {
  const alert = useAlert();
  const handleInfo = () => {
    if (localStorage.getItem('auth-app') == null) {
      alert.error('You must be logged in');
      navigate('login');
      return
    }
    navigate('info')
  };
  return (
    <Wrapper>
      <Hero>
        <h1>This is a Web site</h1>
        <h2>This is a cool web site.</h2>
      </Hero>
      <Content>
        <button
          to="/info"
          type="button"
          className="primary"
          onClick={handleInfo}
        >
          Info
        </button>
        <Button to="/login" type="button" className="secondary">
          Log in
        </Button>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${black};
  height: 100vh;
  color: ${grey};
  display: flex;
  flex-direction: column;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 3;
  clip-path: polygon(100% 15%, 100% 70%, 0 90%, 0 35%);
  background: ${grey};
  color: ${black};
  h1 {
    font-size: calc(16px + 3.5vw);
    margin: 0;
    color: ${turquoise};
    cursor: default;
  }
  h2 {
    font-size: calc(16px + 1vw);
    margin: 0;
    word-spacing: 5px;
    margin-top: 0.5rem;
    cursor: default;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 0 1rem;

  & .primary {
    cursor: pointer;
    width: 20%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin: 0.5rem;
    font-family: inherit;
    font-weight: 800;
    text-align: center;
    font-size: calc(16px + 2vw);
    border: 0px;
    transition: all 0.3s ease-in-out;
    padding: 10px;
    text-decoration: none;
    background: ${turquoise};
    color: ${grey};
    :active {
      background: ${grey};
      color: ${turquoise};
    }
  }
  & .secondary {
    background: ${black};
    color: ${turquoise};
    :active {
      background: ${turquoise};
      color: ${black};
    }
  }
`;

const Button = styled(Link)`
  cursor: pointer;
  width: 20%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0.5rem;
  font-family: inherit;
  font-weight: 800;
  text-align: center;
  font-size: calc(16px + 2vw);
  border: 0px;
  transition: all 0.3s ease-in-out;
  padding: 10px;
  text-decoration: none;

  @media (max-width: 576px) {
    width: 30%;
    font-size: calc(16px + 1vw);
  }
  :focus {
    outline: 2px solid ${black};
  }
  :hover {
    transform: scale(1.05);
  }
  :active {
    color: #ffffff;
    background: ${black};
  }
`;

export default Landing;
