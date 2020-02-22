import React, { useState, useEffect, Fragment } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Image, Card } from "semantic-ui-react";
import moment from "moment";

import Loader from "../components/Loader";

const SinglePost = props => {
  const postId = props.match.params.postId;

  const [getPost, setPost] = useState({});

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId }
  });

  useEffect(() => {
    if (data) {
      setPost(data.getPost);
    }
  }, [data]);

  const {
    id,
    body,
    createdAt,
    username,
    comments,
    likes,
    likeCount,
    commentCount
  } = getPost;
  console.log(username);
  let postMarkup = (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            size="small"
            float="right"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  return <Fragment>{loading ? <Loader /> : <h1>Hello</h1>}</Fragment>;
};

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
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

export default SinglePost;
