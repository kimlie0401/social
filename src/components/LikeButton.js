import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Icon, Label, Button } from "semantic-ui-react";

const LikeButton = ({ user: { user }, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);
  console.log(user.username, likes);

  useEffect(() => {
    if (user && likes && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {}
  });

  const likeButton = user ? (
    liked ? (
      <Button color="red" size="tiny">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="red" size="tiny" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="red" size="tiny" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" size="tiny" onClick={likePost}>
      {likeButton}
      <Label basic color="red" pointing="left" size="tiny">
        {likeCount}
      </Label>
    </Button>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
