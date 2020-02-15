import React, { useState, Fragment } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const PostForm = () => {
  const [errors, setErrors] = useState({});
  const { values, onChange, onSubmit } = useForm(createPostCallBack, {
    body: ""
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      const new_post = result.data.createPost;
      //   data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [new_post, ...data.getPosts] }
      });
      values.body = "";
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    }
  });

  function createPostCallBack() {
    createPost();
  }

  console.log(errors);

  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={Object.keys(errors).length > 0 ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">{<li>{errors}</li>}</ul>
        </div>
      )}
    </Fragment>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
