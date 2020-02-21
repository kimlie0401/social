import React, { useContext } from "react";
import { Card, Icon, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

const PostCard = props => {
  const {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes
  } = props.post;

  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        {/* <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        /> */}
        <Card.Header style={{ fontSize: "1rem" }}>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>
          {body.length > 25 ? `${body.substring(0, 25)}...` : body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={{ user }} post={{ id, likes, likeCount }} />
        <Button labelPosition="right" size="tiny" as={Link} to={`/post/${id}`}>
          <Button color="teal" basic size="tiny">
            <Icon name="comment" />
          </Button>
          <Label basic color="teal" pointing="left" size="tiny">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            as="div"
            color="red"
            size="tiny"
            floated="right"
            onClick={() => alert("Delete Post")}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
