import React, { Component } from "react"; //Import component from react for the class to extend from.
import { Card } from "react-bootstrap";
import "./About.css";
import GitHubLogo from "./GitHub-Mark-32px.png";
export class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drink1: [],
			drink2: [],
			drink3: [],
		};
	}

	componentDidMount() {
		this.fetchUrl();
	}

	fetchUrl() {
		let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					drink1: data.drinks[0].strDrinkThumb,
				});
			})
			.catch((error) => console.log(error));

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					drink2: data.drinks[0].strDrinkThumb,
				});
			})
			.catch((error) => console.log(error));

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					drink3: data.drinks[0].strDrinkThumb,
				});
			})
			.catch((error) => console.log(error));
	}

	render() {
		return (
			<React.Fragment>
				<div className="d-flex justify-content-center">
					<h1 id="aboutH1">About the Authors</h1>
				</div>
				<div className="d-flex justify-content-center">
					<Card id="aboutCard">
						<Card.Img
							variant="top"
							src={this.state.drink1}
							alt="Favorite Drink"
						/>
						<Card.Body>
							<Card.Title>Jordan Co</Card.Title>
							<Card.Text>Filler</Card.Text>
							<Card.Text>
								<a href="https://github.com/Coleeco">
									<img
										border="0"
										alt="GitHub"
										src={GitHubLogo}
									/>
									Coleeco
								</a>
							</Card.Text>
						</Card.Body>
					</Card>

					<Card id="aboutCard">
						<Card.Img
							variant="top"
							src={this.state.drink2}
							alt="Favorite Drink"
						/>
						<Card.Body>
							<Card.Title>Todd Graham</Card.Title>
							<Card.Text>
								Todd is graduate student of computer science at
								Portland State. His favorite drink is a habanero
								margarita.
							</Card.Text>
							<Card.Text>
								<a href="https://github.com/toddgraham121">
									<img
										border="0"
										alt="GitHub"
										src={GitHubLogo}
									/>
									toddgraham121
								</a>
							</Card.Text>
						</Card.Body>
					</Card>

					<Card id="aboutCard">
						<Card.Img
							variant="top"
							src={this.state.drink3}
							alt="Favorite Drink"
						/>
						<Card.Body>
							<Card.Title>Erik Jastad</Card.Title>
							<Card.Text>Filler</Card.Text>
							<Card.Text>
								<a href="https://github.com/esjastad">
									<img
										border="0"
										alt="GitHub"
										src={GitHubLogo}
									/>
									esjastad
								</a>
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			</React.Fragment>
		);
	}
}
