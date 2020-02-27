import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import gql from "graphql-tag";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import { AuthContext } from "../context/auth";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = props => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const { loading, data, subscribeToMore } = useQuery(FETCH_POSTS_QUERY);

  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data]);

  useEffect(() => {
    subscribeToNewComments();
  });

  const subscribeToNewComments = () =>
    subscribeToMore({
      document: SUBSCRIPTION_QUERY,

      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newPost;
        if (prev.getPosts.find(post => post.id === newFeedItem.id)) {
          return prev;
        }
        return Object.assign({}, prev, {
          getPosts: [newFeedItem, ...prev.getPosts]
        });
      }
    });

  return (
    <>
      <h1 className="page-title" style={{ color: "#00b5ad" }}>
        Recent Posts
      </h1>
      <Grid columns={3} stackable>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <Loader />
          ) : (
            <Transition.Group animation="scale">
              {posts &&
                posts.map(post => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
};

const SUBSCRIPTION_QUERY = gql`
  subscription {
    newPost {
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

export default Home;
