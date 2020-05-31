import styled from '@emotion/styled';

import { black, grey, red, error } from './colors';

const Log = styled.div`
  display: flex;
  flex-basis: 35%;
  background: ${black};
  justify-content: center;
  text-align: center;

  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    flex-basis: 45%;
  }
  @media only screen and (max-width: 767px) {
    order: 2;
    flex-basis: 100%;
  }

  h1 {
    color: ${grey};
  }

  & .form-control {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-basis: 50%;
    @media only screen and (max-width: 767px) {
      flex-basis: 70%;
    }
    & .link {
      text-decoration: none;
      color: ${red};
    }

    & .error {
      color: ${error};
      font-size: 12px;
      margin: 0;
    }

    p {
      color: ${grey};
    }

    & .submit {
      font-size: 20px;
      margin-top: 1rem;
    }

    input {
      display: block;
      box-sizing: border-box;
      width: 100%;
      border-radius: 4px;
      border: 1px solid white;
      padding: 10px 15px;
      margin-bottom: 10px;
      font-size: 14px;
    }

    label {
      line-height: 2;
      text-align: left;
      display: block;
      margin-bottom: 13px;
      margin-top: 20px;
      color: white;
      font-size: 16px;
      font-weight: 200;
    }
  }
`;

const Content = styled.div`
  flex-basis: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    flex-basis: 55%;
  }
  @media only screen and (max-width: 767px) {
    order: 1;
    flex-basis: 100%;
  }

  img {
    width: 40%;
    height: auto;
  }
  overflow: hidden;
`;

export { Log, Content };
