import React, { useState, useEffect } from "react";
import {Avatar, Button} from "@material-ui/core";
import firebase from 'firebase';
import { db } from '../../firebase'
import "./Post.css";

export default function Post({ user, postId, username, avatar, postImage, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db.collection('posts')
      .doc(postId).collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setComments(snapshot.docs.map(doc => doc.data()))
      })
    }

    return () => {
      unsubscribe();
    }
  }, [postId]);

  const postComment = e => {
    e.preventDefault();
    console.log(postId)
    db.collection('posts')
    .doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setComment('');
  }

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
      <div className="post__comments">
        <div className="comments">
          {comments.map(comment => (
            <p><strong>{comment.username} </strong>{comment.text}</p>
          ))}
        </div>
        <div className="post__addComment">
        <form>
        <input
          type="text"
          placeholder="Post Comment"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <Button disabled={!comment} type="submit" onClick={postComment}>
          Post
        </Button>
        </form>
        </div>
      </div>
    </div>
  );
}
