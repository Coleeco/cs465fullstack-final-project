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
import Favorites from "./components/Favorites";

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
				<div className="container" id="siteContainer">
					<Jumbotron className="my-0 pt-4 title">
						<h1>
							<img
								className="icon"
								src="/martini.png"
								alt="martini icon"
							></img>
							Cocktail Mastery
							<span>
								<img
									className="icon"
									src="/liquor.png"
									alt="liquor icon"
								></img>
							</span>
						</h1>
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
						<Route
							path="/search"
							render={(props) => (
								<Search {...props} user={this.state.user} />
							)}
						/>
						<Route
							path="/login"
							render={(props) => (
								<Login {...props} login={this.login} />
							)}
						/>
						<Route
							path="/register"
							render={(props) => (
								<Register {...props} login={this.login} />
							)}
						/>
						<Route path="/about" component={About} />
						<Route
							path="/fav"
							render={(props) => (
								<Favorites {...props} user={this.state.user} />
							)}
						/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
