import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import MyPopup from "../util/MyPopup";

const DeleteButton = props => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = props.commentId
    ? DELETE_COMMENT_MUTATION
    : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!props.commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        });
        const newPost = data.getPosts.filter(post => post.id !== props.postId);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: [...newPost] }
        });
      }

      if (props.callback) props.callback();
    },
    variables: {
      postId: props.postId,
      commentId: props.commentId
    },
    onError(err) {}
  });

  return (
    <>
      <MyPopup content={props.commentId ? "Delete comment" : "Delete Post"}>
        <Button
          basic
          icon
          as="div"
          color="red"
          size="mini"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
