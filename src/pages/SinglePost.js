import React, {
  useState,
  useEffect,
  Fragment,
  useContext,
  useRef
} from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Grid, Card, Form, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";

import Loader from "../components/Loader";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import MyPopup from "../util/MyPopup";

const SinglePost = props => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [getPost, setPost] = useState({});
  const [comment, setComment] = useState("");

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId }
  });

  const [submitComment, { error }] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    onError(err) {},
    variables: {
      postId,
      body: comment
    }
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

  const deletePostCallback = () => {
    props.history.push("/");
  };

  const postMarkup = (
    <Grid style={{ display: "flex", justifyContent: "center" }}>
      <Grid.Row>
        {/* <Grid.Column width={2}>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            size="small"
            float="right"
          />
        </Grid.Column> */}
        <Grid.Column width={15}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton user={{ user }} post={{ id, likeCount, likes }} />
              <MyPopup content="Comment on post">
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => commentInputRef.current.focus()}
                  size="tiny"
                >
                  <Button basic color="teal" size="tiny">
                    <Icon name="comment" />
                  </Button>
                  <Label basic color="teal" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
              </MyPopup>
              {user && user.username === username && (
                <DeleteButton postId={id} callback={deletePostCallback} />
              )}
            </Card.Content>
          </Card>
          {user && (
            <Card fluid>
              <Card.Content>
                <p>Post a comment:</p>
                <Form>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="Commnet.."
                      name="comment"
                      value={comment}
                      onChange={event => setComment(event.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      className="ui button teal"
                      type="submit"
                      disabled={comment.trim() === ""}
                      onClick={submitComment}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {error && (
            <div className="ui error message" style={{ marginBottom: 20 }}>
              <ul className="list">
                {<li>{error.graphQLErrors[0].message}</li>}
              </ul>
            </div>
          )}
          {comments &&
            comments.map(comment => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
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

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default SinglePost;
