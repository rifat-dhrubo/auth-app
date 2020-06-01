/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { navigate } from '@reach/router';
import { useAlert } from 'react-alert';
import ReactPaginate from 'react-paginate';
import { black, grey, lightBlack, turquoise } from './utils/colors';
import Data from './Data';

const Info = () => {
  const [allUserData, setAllUserData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert();
  const handlePageClick = ({ selected }) => {
    const go = Number(selected);
    setCurrentPage(go + 1);
  };
  useEffect(
    function loadProductData() {
      console.log(`fired`);
      if (localStorage.getItem('auth-app') == null) {
        alert.error(' You must log in to view this');
        navigate('login');
      }
      async function fetchData() {
        const data = await fetch(
          `api/v1/user?page=${currentPage}`
        ).then((response) => response.json());

        setAllUserData(data.user);
        setPages(data.pages);
        setTotalUsers(data.count);
      }

      fetchData();
    },
    [alert, currentPage]
  );

  return (
    <Wrapper>
      <Row>
        {allUserData.map((data) => {
          return <Data key={data._id} data={data} />;
        })}
      </Row>
      <div className="paginate">
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 94vh;
  background: ${black};
  color: ${grey};
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;

  & .paginate {
    display: flex;
    flex-basis: 60%;
    margin: auto;

    ul {
      display: flex;
      color: ${grey};
      background: ${lightBlack};
      justify-content: space-around;
      flex-basis: 100%;
      cursor: default;
      padding: 20px 5px;
      list-style: none;

      li {
        cursor: pointer;

        & :hover {
          background: ${grey};
          color: ${turquoise};
        }
        a {
          padding: 10px;
        }
      }
    }
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-basis: 100%;
`;

export default Info;
