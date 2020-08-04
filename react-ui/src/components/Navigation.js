import React, { Component } from "react"; //Import component from react for the class to extend from.
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export class Navigation extends Component {
  
  render() {
    const user = this.props.user;
    let loggedIn = user.loginname !== ''? true:false;
    let loginlogout;
    if (loggedIn) {
      loginlogout = (
        <NavLink
          className="d-inline p-2 bg-dark text-white"
          to=""
          onClick={this.props.logout}
        >
          Logout
        </NavLink>
      );
    } else {
      loginlogout = (
        <>
        <NavLink className="d-inline p-2 bg-dark text-white" to="/login">
          Login
        </NavLink>
        <NavLink className="d-inline p-2 bg-dark text-white" to="/register">
          Sign Up 
        </NavLink>
        </>
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