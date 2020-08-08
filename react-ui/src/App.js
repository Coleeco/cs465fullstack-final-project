import React from "react";
import "./App.css";

import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { Game } from "./components/Game";
import { Search } from "./components/Search";
import { About } from "./components/About";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Favorites from "./components/Favorites";
import { getRequest } from "./ApiCaller";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Jumbotron, Table } from "react-bootstrap";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { loginname: "", score: "", title: "" },
      gameHardmode: false,
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.UserBanner = this.UserBanner.bind(this);
    this.hardmode = this.hardmode.bind(this);
  }

  componentDidMount() {
    if (this.state.user.loginname !== "") {
      getRequest("/titles")
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          let i;
          for (i = 0; i < data.length - 1; ++i) {
            let minScore = data[i].minscore;
            let nextScore = data[i + 1].minscore;
            let name = data[i].name;
            let score = parseInt(this.state.user.score);
            if (score >= minScore && score < nextScore) {
              this.setState((prevState) => ({
                user: {
                  loginname: prevState.loginname,
                  score: prevState.score,
                  title: name,
                },
              }));
              break;
            }
          }
        });
    }
  }

  hardmode() {
    this.setState({ gameHardmode: !this.state.gameHardmode });
  }

  login(user) {
    this.setState({ user: user });
  }

  logout() {
    getRequest("/user/logout");
    this.setState({ user: { loginname: "", score: "", title: "" } });
  }

  UserBanner() {
    let user = this.state.user;
    let title = user.title === "" ? "N/A" : user.title;
    console.log(title);
    if (user.loginname !== "") {
      return (
        <div className="bannerContainer">
          <Table size="sm" striped variant="dark">
            <thead>
              <tr>
                <th>User</th>
                <td>{user.loginname}</td>
                <th>Score</th>
                <td>{user.score}</td>
                <th>Title</th>
                <td>{title}</td>
              </tr>
            </thead>
          </Table>
        </div>
      );
    } else {
      return <></>;
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
          <Jumbotron className="my-0 pt-4 title">
            {/* <div className="row">
              <div className="col-sm-8"> */}
            <h1>Cocktail Mastery</h1>
            <span>
              <this.UserBanner />
            </span>
          </Jumbotron>
          <Navigation user={this.state.user} logout={this.logout} />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route
              path="/game"
              render={(props) => (
                <Game
                  {...props}
                  hardmode={this.state.gameHardmode}
                  hmclick={this.hardmode}
                  userinfo={this.state.user}
                  refreshScore={this.login}
                />
              )}
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
            <Route path="/fav" component={Favorites} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
