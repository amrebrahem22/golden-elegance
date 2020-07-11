import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Post.css";

export default function Post({ username, avatar, postImage, caption }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt={username} src={avatar} />
        <h3>{username}</h3>
      </div>
      <img src={postImage} alt={username} className="post__image" />
      <h4 className="post__text">
        <strong>{username} </strong>
        {caption}
      </h4>
    </div>
  );
}
