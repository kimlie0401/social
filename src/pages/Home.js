import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import { AuthContext } from "../context/auth";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = props => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data]);

  // let posts = "";

  // if (data) {
  //   posts = { data: data.getPosts };
  // }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <Loader />
        ) : (
          <Transition.Group>
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
  );
};

export default Home;
