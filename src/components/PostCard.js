import React from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

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

  const likePost = () => {
    alert("Like Post!");
  };

  const commentOnPost = () => {
    alert("Comment Post");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header style={{ fontSize: "1rem" }}>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>
          {body.length > 25 ? `${body.substring(0, 25)}...` : body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" size="tiny" onClick={likePost}>
          <Button color="red" basic size="tiny">
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="red" pointing="left" size="tiny">
            {likeCount}
          </Label>
        </Button>
        <Button
          as="div"
          labelPosition="right"
          size="tiny"
          onClick={commentOnPost}
        >
          <Button color="teal" basic size="tiny">
            <Icon name="comment" />
          </Button>
          <Label as="a" basic color="teal" pointing="left" size="tiny">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
