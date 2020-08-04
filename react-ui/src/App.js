import React from "react";
import "./App.css";

import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { Game } from "./components/Game";
import { Search } from "./components/Search";
import { About } from "./components/About";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { getRequest } from "./ApiCaller";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Jumbotron, Table } from "react-bootstrap";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { loginname: "", score: "" , title: "" },
      gameHardmode: false,
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.UserBanner = this.UserBanner.bind(this);
    this.hardmode = this.hardmode.bind(this);
  }

  hardmode(){
    this.setState({gameHardmode: !this.state.gameHardmode});
  }

  login(user) {
    this.setState({ user: user });
    console.log(user);
  }

  logout() {
    getRequest("/user/logout");
    this.setState({ user: { loginname: "", score: "", title: "" } });
  }

  UserBanner() {
    let user = this.state.user;
    if (user.loginname === "") {
      return <div>No user logged in</div>;
    } else {
      return (
        <div className="bannerContainer">
          <Table variant="dark" size="small">
            <thead>
              <tr>
                <th>User</th>
                <th>Score</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.loginname}</td>
                <td>{user.score}</td>
                <td>{user.title}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    }
  }

  render() {
    return (
      // Set a router block to render different pages based on path
      <BrowserRouter>
        <div className="container">
          {/* <h3 className="m-3 d-flex justify-content-center">
            Cocktail Mastery 
          </h3> */}
          <Jumbotron>
            <h2>Cocktail Mastery</h2>
            <this.UserBanner />
          </Jumbotron>
          <Navigation user={this.state.user} logout={this.logout} />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/game" 
              render={(props) => <Game {...props} hardmode={this.state.gameHardmode} hmclick = {this.hardmode}/>} 
              />
            <Route path="/search" component={Search} />
            <Route
              path="/login"
              render={(props) => <Login {...props} login={this.login} />}
            />
            <Route
              path="/register"
              render={(props) => <Register {...props} login={this.login} />}
            />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
