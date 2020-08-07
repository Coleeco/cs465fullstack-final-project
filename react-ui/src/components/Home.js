import React, { Component } from "react"; //Import component from react for the class to extend from.
import "./Home.css";

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			randDrink: [],
		};
	}

	componentDidMount() {
		let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					randDrink: data.drinks[0],
				});
			})
			.catch((error) => console.log(error));
	}

	render() {
		return (
			<React.Fragment>
				<h1 id="aboutH1">Welcome to Cocktail Mastery!</h1>
				<div className="mt-d d-flex justify-content-center">
					<div
						class="card flex-row flex-wrap border-dark"
						id="homeRandomCard"
					>
						<div class="card-header">
							<img
								id="homeRandomImg"
								src={this.state.randDrink.strDrinkThumb}
								alt={this.state.randDrink.strDrink}
							/>
						</div>
						<div class="card-body">
							<h3 class="card-title">
								Drink of the Minute:{" "}
								{this.state.randDrink.strDrink}
							</h3>
							<p class="card-text">Description</p>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
