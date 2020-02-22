import React, { useState, useEffect, Fragment, useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Image, Card, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";

import Loader from "../components/Loader";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";

const SinglePost = props => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

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

  const postMarkup = (
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
            <Card.Content extra>
              <LikeButton user={{ user }} post={{ id, likeCount, likes }} />
              <Button
                as="div"
                labelPosition="right"
                onClick={() => alert("Comment")}
                size="tiny"
              >
                <Button basic color="teal" size="tiny">
                  <Icon name="comment" />
                </Button>
                <Label basic color="teal" pointing="left">
                  {commentCount}
                </Label>
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  return <Fragment>{loading ? <Loader /> : postMarkup}</Fragment>;
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
