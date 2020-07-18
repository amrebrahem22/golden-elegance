import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Container } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { logout } from "../../store/actions/auth";
import "./index.css";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    border: "1px solid #ccc;",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Navbar({ IsAuthenticated, userLogout, user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const loadUser = JSON.parse(user)
  console.log(loadUser)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  return (
    <div className="app__header">
      <Container maxWidth="md">
        <div className="app_headerGrid">
          <img
            src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="website logo"
            className="app_headerImage"
          />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {IsAuthenticated ? (
            <div>
              <Avatar
                alt="Remy Sharp"
                src="https://pbs.twimg.com/profile_images/1260356712684494848/eVTWMPb7_400x400.jpg"
                onClick={handleClick}
                style={{cursor: 'pointer', width: '30px', height: '30px'}}
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{top: '2em'}}
              >
                <MenuItem onClick={() => userLogout()}>Profile</MenuItem>
                <Link to={`/profile/${loadUser.username}`}>My account</Link>
                <MenuItem onClick={() => userLogout()}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="auth__buttons">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  IsAuthenticated: state.auth.token !== null,
  user: state.auth.authenticatedUser
});

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
