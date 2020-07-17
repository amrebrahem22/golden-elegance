import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { authLogin } from "../../store/actions/auth";
import "./index.css";
import Navbar from "../../components/Navbar";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  render() {
    const { IsAuthenticated, loading, error } = this.props;
    const { email, password } = this.state;

    if (IsAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <span id="login-root">
          <Navbar />
          <section className="section-all">
            <main className="main" role="main">
              <div className="wrapper">
                <article className="article">
                  <div className="content">
                    <div className="login-box">
                      <div className="header">
                        <img
                          className="logo"
                          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                          alt="Logo"
                        />
                      </div>
                      <div className="form-wrap">
                        {error && (
                          <div className="alert-d">
                            <Alert severity="error">
                              Username or Password is Wrong!
                            </Alert>
                          </div>
                        )}
                        {loading && (
                          <div className="loading-c">
                            <CircularProgress disableShrink />
                          </div>
                        )}
                        <form onSubmit={this.handleSubmit} className="form">
                          <div className="input-box">
                            <input
                              type="email"
                              id="name"
                              aria-describedby=""
                              placeholder="Enter your email"
                              aria-required="true"
                              autocapitalize="off"
                              autocorrect="off"
                              name="email"
                              value={email}
                              required
                              onChange={this.handleChange}
                            />
                          </div>

                          <div className="input-box">
                            <input
                              type="password"
                              name="password"
                              id="password"
                              placeholder="Password"
                              aria-describedby=""
                              aria-required="true"
                              autocapitalize="off"
                              autocorrect="off"
                              value={password}
                              required
                              onChange={this.handleChange}
                            />
                          </div>

                          <span className="button-box">
                            <Button
                              variant="contained"
                              color="primary"
                              className="btn"
                              disabled={loading}
                              onClick={this.handleSubmit}
                              type="submit"
                            >
                              Login
                            </Button>
                          </span>

                          <a className="forgot" href="">
                            Forgot password?
                          </a>
                        </form>
                      </div>
                    </div>

                    <div className="login-box">
                      <p className="text">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                      </p>
                    </div>

                    <div className="app">
                      <p>Get the app.</p>
                      <div className="app-img">
                        <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&amp;ct=igweb.loginPage.badge&amp;mt=8">
                          <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/4b70f6fae447.png" />
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.instagram.android&amp;referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26utm_medium%3Dbadge">
                          <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/f06b908907d5.png" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </main>
            <footer className="footer" role="contentinfo">
              <div className="footer-container">
                <nav className="footer-nav" role="navigation">
                  <ul>
                    <li>
                      <a href="">About Us</a>
                    </li>
                    <li>
                      <a href="">Support</a>
                    </li>
                    <li>
                      <a href="">Blog</a>
                    </li>
                    <li>
                      <a href="">Press</a>
                    </li>
                    <li>
                      <a href="">Api</a>
                    </li>
                    <li>
                      <a href="">Jobs</a>
                    </li>
                    <li>
                      <a href="">Privacy</a>
                    </li>
                    <li>
                      <a href="">Terms</a>
                    </li>
                    <li>
                      <a href="">Directory</a>
                    </li>
                    <li>
                      <span className="language">
                        Language
                        <select
                          name="language"
                          className="select"
                          onchange="la(this.value)"
                        >
                          <option value="#">English</option>
                          <option value="http://ru-instafollow.bitballoon.com">
                            Russian
                          </option>
                        </select>
                      </span>
                    </li>
                  </ul>
                </nav>

                <span className="footer-logo">&copy; 2020 Golden Elegance</span>
              </div>
            </footer>
          </section>
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  IsAuthenticated: state.auth.token !== null,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToPtops = (dispatch) => ({
  login: (email, password) => dispatch(authLogin(email, password)),
});

export default connect(mapStateToProps, mapDispatchToPtops)(Login);
