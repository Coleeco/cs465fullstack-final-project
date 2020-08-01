import React from "react";
import "./App.css";

//Import the home,game,drink,about components
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { Game } from "./components/Game";
import { Search } from "./components/Search";
import { About } from "./components/About";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { getRequest } from "./ApiCaller";
// import { Child } from "./components/child";

//Import react routing
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { loginname: "", score: "" },
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  // componentDidMount() {
  //   // console.log(this.state.user);
  //   getRequest("/user/current")
  //     .then((resp) => {
  //       if (resp.ok) {
  //         resp.json();
  //       } else {
  //         throw new Error("no user logged on");
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data[0]);
  //       this.setState({ user: data[0] });
  //     })
  //     .catch((error) => console.log(error));
  // }

  login(user) {
    this.setState({user: user})
    console.log(user);
  }

  logout() {
    getRequest("/user/logout");
    this.setState({ user: {} });
  }

  render() {
    let propVal = "fuckin print";
    let user = this.state.user;

    return (

      // Set a router block to render different pages based on path
      <BrowserRouter>
        <div className="container">
          <h3 className="m-3 d-flex justify-content-center">
            Cocktail Mastery 
          </h3>
          <h2>
            User: {user.loginname}  Score: {user.score}
          </h2>
            <Navigation />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/game" component={Game} />
              <Route path="/search" component={Search} />
              <Route path="/login" render={(props) => <Login {...props} login={this.login} myProp={propVal}/>} />
              <Route path="/register" component={Register} />
              <Route path="/about" component={About} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
