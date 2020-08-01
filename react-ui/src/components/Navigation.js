import React, { Component } from "react"; //Import component from react for the class to extend from.
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { getRequest } from "../ApiCaller";

export class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    // this.loginToggle = this.loginToggle.bind(this);
    this.logout = this.logout.bind(this);
  }
  
//   componentWillMount(){
//     this.loginToggle();
//   }

//   // API CALL TO CHECK IF A USER IS LOGGED IN. logged in ? return nav link for logout : return nav link for login
//   loginToggle() {
//     getRequest("/user/current").then((resp) => {
//       if (resp.ok) {
//           console.log('Function called!')
//         this.setState({
//           loggedIn: true,
//         });
//       }
//       else { console.log('In else statement')}
//     });
//   }


  logout() {
    getRequest("/user/logout");
    this.setState({ loggedIn: false });
  }

  render() {
    let loginlogout;
    const loggedIn = this.state.loggedIn;
    console.log(loggedIn);
    if (loggedIn) {
      loginlogout = (
        <NavLink
          className="d-inline p-2 bg-dark text-white"
          to=""
          onClick={this.logout}
        >
          Logout
        </NavLink>
      );
    } else {
      loginlogout = (
        <NavLink className="d-inline p-2 bg-dark text-white" to="/login">
          Login
        </NavLink>
      );
    }

    return (
      <Navbar bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mt-d d-flex justify-content-center">
          <NavLink className="d-inline p-2 bg-dark text-white" to="/">
            Home
          </NavLink>
          <NavLink className="d-inline p-2 bg-dark text-white" to="/game">
            Game
          </NavLink>
          <NavLink className="d-inline p-2 bg-dark text-white" to="/search">
            Search
          </NavLink>
        </Nav>
        <Navbar.Collapse id="responsive-navbar-nav" />
        <Nav>
          {loginlogout}
          <NavLink className="d-inline p-2 bg-dark text-white" to="/about">
            About
          </NavLink>
        </Nav>
      </Navbar>
    );
  }
}