import React, { useState } from "react";
import "./App.css";
import Post from "./components/Post";

function App() {
  const [posts, setPosts] = useState([
    {
      username: 'stephanygonzalezs',
      avatar: 'https://scontent-cdt1-1.cdninstagram.com/v/t51.2885-19/s150x150/89601002_514467599178889_4719499623226408960_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com&_nc_ohc=jmtPf3X1ArwAX8w4DiU&oh=ab45ed9d542dfcfdaecbef03f65beab2&oe=5F33891A',
      postImage: 'https://scontent-cdt1-1.cdninstagram.com/v/t51.2885-15/e35/106797366_751698195370325_1432891972447804008_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=j3YwrjodKw8AX-v8IjT&oh=6c4c5fd63356710823f1f6dee70ec115&oe=5F314E4F',
      caption: 'a new post shared by amr on the new project'
    },
    {
      username: 'hildeee',
      avatar: 'https://scontent-hbe1-1.cdninstagram.com/v/t51.2885-19/s150x150/83790756_1131554570565126_3358402896672045518_n.jpg?_nc_ht=scontent-hbe1-1.cdninstagram.com&_nc_ohc=mb3dyN2ziEkAX8EsyBu&oh=b3bf7efd556056860eab0d0e26a9bb70&oe=5F324010',
      postImage: 'https://scontent-hbe1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/106597008_273904323902988_7707431751203153090_n.jpg?_nc_ht=scontent-hbe1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=8wR_NZC_zlUAX9LS6z-&oh=e04e7d0404e9cd9d361cb098c0d1f4f5&oe=5F34023E',
      caption: 'Baby gal @fashionnova 💙 fashionnovapartner'
    },
    {
      username: 'saraorrego',
      avatar: 'https://scontent-hbe1-1.cdninstagram.com/v/t51.2885-19/s150x150/89043631_227606625033992_5890705847289380864_n.jpg?_nc_ht=scontent-hbe1-1.cdninstagram.com&_nc_ohc=rMBrKS31-VgAX-vE-s3&oh=9c76b8029b13a6e7fe17ae0217976544&oe=5F335614',
      postImage: 'https://scontent-hbe1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/108520454_812710549561444_4175959136643774316_n.jpg?_nc_ht=scontent-hbe1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=Zlt-Zk7FHaQAX9ZLw-l&oh=debd079e56a6bdf3c5f96ee6a4708b6d&oe=5F33FA80',
      caption: '@fashionnova Buenos diaaas🌹 Este outfit está en mi🔝 10 Fashionnovapartner'
    }
  ]);
  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="website logo"
          className="app_headerImage"
        />
      </div>
      {posts.map(post => (
        <Post {...post} />
      ))}
    </div>
  );
}

export default App;
