import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../../firebase";
import firebase from 'firebase';

export default function ImageUpload({username}) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // when error
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete uploading
        storage.ref("images").child(image.name).getDownloadURL()
        .then(url => {
            // move it to database
            db.collection('posts').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                postImage: url,
                username: username
            })

            setProgress(0);
            setCaption('');
            setImage(null);
        })
      }
    );
  };
  return (
    <div>
        <progress value={progress} max='100' />
      <input
        type="text"
        placeholder="Enter a Caption"
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button type="submit" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}
