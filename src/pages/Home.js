import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const Home = props => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  if (data) {
    console.log(data);
  }

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
