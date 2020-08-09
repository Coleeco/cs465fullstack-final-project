import React, { Component } from "react"; //Import component from react for the class to extend from.
import "./Search.css";
import { SearchDrinkModal } from "./Drink.js";
import { SearchDrinkFilterModal } from "./DrinkFilter.js";

export class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drinks: [],
			isLoaded: false,
			select: "name",
		};

		this.searchFunction = this.searchFunction.bind(this);
		this.randomFunction = this.randomFunction.bind(this);
		this.updateDropDown = this.updateDropDown.bind(this);
	}

	// Update dropdown value (select variable)
	updateDropDown() {
		this.setState({ select: document.getElementById("dropdown").value });
	}

	// Search function, dependent on the value of select
	searchFunction(event) {
		const searchValue = document.getElementById("searchbar").value;
		event.preventDefault();
		this.updateDropDown(event);
		let url = "";

		// Either search by name or ingredient
		if (this.state.select !== "name") {
			url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`;
		} else {
			url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
		}

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					drinks: data.drinks,
					isLoaded: true,
				});
			})
			.catch((error) => console.log(error));

		event.preventDefault();
	}

	// Search for a random drink
	randomFunction(event) {
		let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					drinks: data.drinks,
					isLoaded: true,
				});
			})
			.catch((error) => console.log(error));

		event.preventDefault();
	}

	render() {
		const { drinks } = this.state;

		return (
			<React.Fragment>
				<div id="searchHeader">
					<h1>Cocktail Search</h1>
					<p>
						Search for drinks based off either their name or
						ingredient.
					</p>
				</div>
				<div className="d-flex justify-content-center">
					{/* Form for search bar */}
					<form className="cocktail-search">
						<div className="form-search">
							<input
								id="searchbar"
								placeholder="Search a cocktail by..."
							/>
							<select
								id="dropdown"
								onChange={this.updateDropDown}
							>
								<option value="name">Name</option>
								<option value="i">Ingredient</option>
							</select>
						</div>
						<div className="btnrow">
							<button
								id="searchButton"
								onClick={this.searchFunction}
							>
								Search
							</button>
							<button
								id="searchButton"
								onClick={this.randomFunction}
							>
								Random
							</button>
						</div>
					</form>
				</div>

				{/* Depending on the type of search (and the parameters returned from the API) we use a different Drink template */}
				{this.state.select !== "name" && (
					<SearchDrinkFilterModal
						data={drinks}
						user={this.props.user}
					/>
				)}
				{this.state.select === "name" && (
					<SearchDrinkModal data={drinks} user={this.props.user} />
				)}
			</React.Fragment>
		);
	}
}
