import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link, navigate } from '@reach/router';
import { TiThMenuOutline } from 'react-icons/ti';
import { IoIosCloseCircle } from 'react-icons/io';
import { useAlert } from 'react-alert';
import { lightBlack, turquoise, grey } from './utils/colors';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const alert = useAlert();

  const handleLogout = () => {
    localStorage.removeItem('auth-app');
    setIsLoggedIn(false);
    alert.success('You have been logged out');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  useEffect(() => {
    if (localStorage.getItem('auth-app') != null) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Nav open={open}>
        <div className="left">
          <ul>
            <li>
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="link" to="/info">
                Info
              </Link>
            </li>
            <li>
              <Link className="link" to="/update">
                Update
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <div className="logout">
                  <button type="button" onClick={handleLogout}>
                    Log out
                  </button>
                </div>
              ) : (
                <Link className="link" to="/login">
                  Log in
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className="right">
          <button type="button" onClick={() => setOpen(!open)}>
            <i>
              {open ? (
                <IoIosCloseCircle
                  style={{ width: '30px', height: '30px', color: turquoise }}
                />
              ) : (
                <TiThMenuOutline
                  style={{ width: '30px', height: '30px', color: grey }}
                />
              )}
            </i>
          </button>
        </div>
      </Nav>
    </>
  );
};

const Nav = styled.nav`
  display: flex;
  background: ${lightBlack};
  justify-content: space-between;
  flex-basis: 100%;
  height: 80px;
  align-items: center;
  color: ${turquoise};

  button {
    display: block;
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
  }

  & .left {
    display: flex;
    flex-basis: 90%;
    justify-content: space-between;

    ul {
      display: flex;
      justify-content: space-between;
      list-style: none;
      display: flex;
      flex-basis: 30%;
      font-weight: 400;
      color: ${turquoise};
      padding: 0 10px;

      li {
        cursor: pointer;
        color: ${turquoise};
        & :hover {
          color: ${grey};
        }
      }
    }

    & .link {
      text-decoration: none;
      color: inherit;
    }
    & .logout {
      button {
        color: ${grey};
        font-size: inherit;
      }
    }
  }

  & .right {
    display: flex;
    flex-basis: 5%;
    justify-content: flex-end;
    & :first-of-type {
      display: none;
    }
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: ${({ open }) => (open ? 'column-reverse' : 'row')};
    min-height: ${({ open }) => (open ? '300px' : 'initial')};

    & .left {
      flex-basis: ${({ open }) => (open ? 'inherit' : '10%')};
      flex-grow: ${({ open }) => (open ? '1' : '0')};
      flex-direction: column;
      justify-content: space-evenly;
      padding: 0 10px;
      ul {
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        flex-grow: 1;
        & :not(:first-of-type) {
          display: ${({ open }) => (open ? 'flex' : 'none')};
        }
      }
      div {
        display: ${({ open }) => (open ? 'flex' : 'none')};
        justify-content: center;
      }
    }

    & .right {
      & :first-of-type {
        display: block;
      }
    }
  }
`;

export default Navbar;
