import React, {Component} from 'react'; //Import component from react for the class to extend from.
import {NavLink} from'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component {
    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav"/>

                <Nav>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">Home</NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/game">Game</NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/drinks">Drinks</NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/about">About</NavLink>
                </Nav>
            </Navbar>
        )
    }
}
