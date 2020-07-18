import React from "react";
import axios from "axios";
import { Container } from "@material-ui/core";
import Navbar from "../../components/Navbar";
import { accountDetail } from "../../constants";
import "./index.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    // Don't do this!
    this.state = {
      user: {profile: {}, posts: []},
      error: null,
    };
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    axios
      .get(accountDetail(username))
      .then((res) => {
        let data = JSON.stringify(res.data);
        console.log("data: ", data);
        this.setState({ user: JSON.parse(data) });
        console.log("state", this.getState());
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <header>
          <Container maxWidth="md">
            <div className="profile">
              <div className="profile-image">
                <img src={user.profile.avatar} alt="" width="150" height="150" style={{objectFit: "cover"}}/>
              </div>

              <div className="profile-user-settings">
                <h1 className="profile-user-name">{user.username}</h1>
                <button className="btn profile-edit-btn">Edit Profile</button>
                <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button>
              </div>

              <div className="profile-stats">
                <ul>
                  <li><span className="profile-stat-count">{user.posts.length}</span> posts</li>
                  <li><span className="profile-stat-count">{user.profile.followers_count}</span> followers</li>
                  <li><span className="profile-stat-count">{user.profile.following_count}</span> following</li>
                </ul>
              </div>

              <div className="profile-bio">
                <p><span className="profile-real-name">{user.profile.first_name} {user.profile.last_name}</span> {user.profile.description}</p>
              </div>
            </div>
          </Container>
        </header>

        <main>
          <Container maxWidth="md">
            <div className="gallery">
              <div className="gallery-item" tabindex="0">
                <img
                  src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                  className="gallery-image"
                  alt=""
                />
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> 56
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> 2
                    </li>
                  </ul>
                </div>
              </div>

              <div className="gallery-item" tabindex="0">
                <img
                  src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop"
                  className="gallery-image"
                  alt=""
                />
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> 89
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> 5
                    </li>
                  </ul>
                </div>
              </div>

              <div className="gallery-item" tabindex="0">
                <img
                  src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop"
                  className="gallery-image"
                  alt=""
                />
                <div className="gallery-item-type">
                  <span className="visually-hidden">Gallery</span>
                  <i className="fas fa-clone" aria-hidden="true"></i>
                </div>

                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> 42
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> 1
                    </li>
                  </ul>
                </div>
              </div>

              <div className="gallery-item" tabindex="0">
                <img
                  src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
                  className="gallery-image"
                  alt=""
                />
                <div className="gallery-item-type">
                  <span className="visually-hidden">Video</span>
                  <i className="fas fa-video" aria-hidden="true"></i>
                </div>

                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> 38
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> 0
                    </li>
                  </ul>
                </div>
              </div>

              <div className="gallery-item" tabindex="0">
                <img
                  src="https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop"
                  className="gallery-image"
                  alt=""
                />

                <div className="gallery-item-type">
                  <span className="visually-hidden">Gallery</span>
                  <i className="fas fa-clone" aria-hidden="true"></i>
                </div>

                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> 47
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> 1
                    </li>
                  </ul>
                </div>
              </div>

              <div className="gallery-item" tabindex="0">
                <img
                  src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop"
                  className="gallery-image"
                  alt=""
                />

                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> 94
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> 3
                    </li>
                  </ul>
                </div>
              </div>

              <div className="gallery-item" tabindex="0">
                <img
                  src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop"
                  className="gallery-image"
                  alt=""
                />

                <div className="gallery-item-type">
                  <span className="visually-hidden">Gallery</span>
                  <i className="fas fa-clone" aria-hidden="true"></i>
                </div>

                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> 52
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> 4
                    </li>
                  </ul>
                </div>
              </div>

              <div className="gallery-item" tabindex="0">
                <img
                  src="https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop"
                  className="gallery-image"
                  alt=""
                />

                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> 66
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> 2
                    </li>
                  </ul>
                </div>
              </div>

              <div className="gallery-item" tabindex="0">
                <img
                  src="https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop"
                  className="gallery-image"
                  alt=""
                />

                <div className="gallery-item-type">
                  <span className="visually-hidden">Gallery</span>
                  <i className="fas fa-clone" aria-hidden="true"></i>
                </div>

                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> 45
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> 0
                    </li>
                  </ul>
                </div>
              </div>

              <div className="gallery-item" tabindex="0">
                <img
                  src="https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop"
                  className="gallery-image"
                  alt=""
                />

                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> 34
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> 1
                    </li>
                  </ul>
                </div>
              </div>

              <div className="gallery-item" tabindex="0">
                <img
                  src="https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop"
                  className="gallery-image"
                  alt=""
                />

                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> 41
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> 0
                    </li>
                  </ul>
                </div>
              </div>

              <div className="gallery-item" tabindex="0">
                <img
                  src="https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop"
                  className="gallery-image"
                  alt=""
                />

                <div className="gallery-item-type">
                  <span className="visually-hidden">Video</span>
                  <i className="fas fa-video" aria-hidden="true"></i>
                </div>

                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> 30
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> 2
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="loader"></div>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

export default Profile;
