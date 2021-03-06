import React, { useContext } from "react";
import { Card, Icon, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import MyPopup from "../util/MyPopup";

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
    <Card fluid color="teal">
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
        <MyPopup content="Comment on post">
          <Button
            labelPosition="right"
            size="mini"
            as={Link}
            to={`/posts/${id}`}
          >
            <Button color="teal" basic size="mini">
              <Icon name="comment" />
            </Button>
            <Label basic color="teal" pointing="left" size="mini">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>

        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
