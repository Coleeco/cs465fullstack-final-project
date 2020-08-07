import React, { Component } from "react"; //Import component from react for the class to extend from.
import "./Home.css";

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			randDrink: [],
		};

		this.parseIngMeasure = this.parseIngMeasure.bind(this);
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

	parseIngMeasure(drink) {
		let listIngredients = [];
		let listMeasures = [];
		for (var ingredient in drink) {
			var ingTemp = ingredient.split("strIngredient");
			var measureTemp = ingredient.split("strMeasure");
			if (ingTemp[0] === "" && drink[ingredient] != null) {
				listIngredients.push(drink[ingredient]);
			}
			if (measureTemp[0] === "" && drink[ingredient] != null) {
				listMeasures.push(drink[ingredient]);
			}
		}

		let element = listIngredients.map((item, index) => {
			return (
				<li key={index}>
					{item}: {listMeasures[index]}
				</li>
			);
		});

		return <ul>{element}</ul>;
	}

	render() {
		return (
			<React.Fragment>
				<h1 id="aboutH1">Welcome to Cocktail Mastery!</h1>
				<div className="mt-d d-flex justify-content-center">
					<div class="card" id="homeRandomCard">
						<div class="row" id="rowHome">
							<div class="col-auto">
								<img
									id="homeRandomImg"
									src={this.state.randDrink.strDrinkThumb}
									alt={this.state.randDrink.strDrink}
									class="img-fluid rounded"
								/>
							</div>
							<div class="col">
								<div class="card-block px-2">
									<h3 className="card-title">
										Drink of the Minute:{" "}
										{this.state.randDrink.strDrink}
									</h3>
									<p className="card-text">
										<b>Type:</b>{" "}
										{this.state.randDrink.strAlcoholic}
									</p>
									<p className="card-text">
										<b>Ingredients:</b>
										{this.parseIngMeasure(
											this.state.randDrink
										)}
									</p>
								</div>
							</div>
						</div>
						<p id="homeRandomInstructions">
							<b>Instructions:</b>
							<br /> {this.state.randDrink.strInstructions}
						</p>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
