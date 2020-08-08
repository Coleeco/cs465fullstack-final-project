import React, { Component } from "react"; //Import component from react for the class to extend from.
import "./Search.css";
import { Card, Modal, Button } from "react-bootstrap";
import { AddFav } from "./Favorites";

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

	updateDropDown(event) {
		this.setState({ select: document.getElementById("dropdown").value });
	}

	searchFunction(event) {
		const searchValue = document.getElementById("searchbar").value;
		event.preventDefault();
		this.updateDropDown(event);
		let url = "";
		const { select } = this.state;

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
		const { drinks, isLoaded, select } = this.state;

		return (
			<React.Fragment>
				<div id="searchHeader">
					<h1>Cocktail Search</h1>
					<p>
						Search for drinks based off either their name or
						ingredient.
					</p>
				</div>
				<div className="mt-d d-flex justify-content-center">
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
							<h5> Click on the drink images for more info</h5>
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

export class SearchDrinkFilterModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			modalTitle: "",
		};

		this.modalShow = this.modalShow.bind(this);
		this.modalClose = this.modalClose.bind(this);
		this.modalUpdate = this.modalUpdate.bind(this);
	}

	modalShow() {
		this.setState({
			modalShow: true,
		});
	}

	modalClose() {
		this.setState({
			modalShow: false,
		});
	}

	modalUpdate(title) {
		this.setState({
			modalTitle: title,
		});
	}

	render() {
		return (
			<div className="container mt-5">
				<Modal show={this.state.modalShow} onHide={this.modalClose}>
					<Modal.Header closeButton>
						<Modal.Title>{this.state.modalTitle}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						For more information, search {this.state.modalTitle} by
						name.
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={this.modalClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
				<DrinkFilter
					data={this.props.data}
					showModal={this.modalShow}
					modalUpdate={this.modalUpdate}
					user={this.props.user}
				/>
			</div>
		);
	}
}

export class DrinkFilter extends Component {
	constructor(props) {
		super(props);

		this.handleDrinkClick = this.handleDrinkClick.bind(this);
	}

	handleDrinkClick(item) {
		this.props.modalUpdate(item.strDrink);
		this.props.showModal();
	}

	formatCards() {
		let user = this.props.user.loginname;
		if (this.props.data === null) {
			return <h1 id="searchEmpty">No results found</h1>;
		} else {
			let element = this.props.data.map((item, index) => {
				return (
					<Card id="drinkCard" key={index}>
						<Card.Img
							variant="top"
							src={item.strDrinkThumb}
							alt={item.strDrink}
							onClick={() => this.handleDrinkClick(item)}
						/>
						<Card.Body>
							<Card.Title>{item.strDrink}</Card.Title>
							{user === "" ? (
								<></>
							) : (
								<AddFav user={user} id={item.idDrink} />
							)}
						</Card.Body>
					</Card>
				);
			});
			return <div className="drinkContainer">{element}</div>;
		}
	}

	render() {
		return this.formatCards();
	}
}

export class SearchDrinkModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false,
			modalTitle: "",
			modalIngredients: "",
			modalType: "",
			modalGlass: "",
			modalCategory: "",
			modalInstructions: "",
		};

		this.modalShow = this.modalShow.bind(this);
		this.modalClose = this.modalClose.bind(this);
		this.modalUpdate = this.modalUpdate.bind(this);
	}

	modalShow() {
		this.setState({
			modalShow: true,
		});
	}

	modalClose() {
		this.setState({
			modalShow: false,
		});
	}

	modalUpdate(title, type, category, glass, ingredients, instructions) {
		this.setState({
			modalTitle: title,
			modalType: type,
			modalCategory: category,
			modalGlass: glass,
			modalIngredients: ingredients,
			modalInstructions: instructions,
		});
	}

	render() {
		return (
			<div className="container mt-5">
				<Modal show={this.state.modalShow} onHide={this.modalClose}>
					<Modal.Header closeButton>
						<Modal.Title>{this.state.modalTitle}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<b>Type:</b> {this.state.modalType}
						<br />
						<b>Glass:</b> {this.state.modalGlass}
						<br />
						<b>Category:</b> {this.state.modalCategory}
						<br />
						<b>Ingredients:</b> {this.state.modalIngredients}
						<b>Instructions:</b> {this.state.modalInstructions}
						<br />
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={this.modalClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
				<Drink
					data={this.props.data}
					showModal={this.modalShow}
					modalUpdate={this.modalUpdate}
					user={this.props.user}
				/>
			</div>
		);
	}
}

export class Drink extends Component {
	constructor(props) {
		super(props);

		this.handleDrinkClick = this.handleDrinkClick.bind(this);
	}

	handleDrinkClick(item) {
		let ingredients = this.parseIngMeasure(item);
		this.props.modalUpdate(
			item.strDrink,
			item.strAlcoholic,
			item.strCategory,
			item.strGlass,
			ingredients,
			item.strInstructions
		);
		this.props.showModal();
		console.log(item.idDrink);
	}

	parseIng(drink) {
		let listIngredients = "";
		for (var ingredient in drink) {
			var stringTemp = ingredient.split("strIngredient");
			if (
				stringTemp[0] === "" &&
				drink[ingredient] != null &&
				drink[ingredient] !== ""
			) {
				if (ingredient === "strIngredient1") {
					listIngredients += drink[ingredient];
				} else {
					listIngredients += `, ${drink[ingredient]}`;
				}
			}
		}
		return listIngredients;
	}

	parseIngMeasure(drink) {
		let listIngredients = [];
		let listMeasures = [];
		for (var ingredient in drink) {
			var ingTemp = ingredient.split("strIngredient");
			var measureTemp = ingredient.split("strMeasure");
			if (
				ingTemp[0] === "" &&
				drink[ingredient] != null &&
				drink[ingredient] !== ""
			) {
				listIngredients.push(drink[ingredient]);
			}
			if (
				measureTemp[0] === "" &&
				drink[ingredient] != null &&
				drink[ingredient] !== ""
			) {
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

	formatCards() {
		let user = this.props.user.loginname;
		if (this.props.data === null) {
			return <h1 id="searchEmpty">No results found</h1>;
		} else {
			let element = this.props.data.map((item, index) => {
				let listIngredients = this.parseIng(item);
				return (
					<Card id="drinkCard" key={index}>
						<Card.Img
							variant="top"
							src={item.strDrinkThumb}
							alt={item.strDrink}
							onClick={() => this.handleDrinkClick(item)}
						/>
						<Card.Body>
							<Card.Title>{item.strDrink}</Card.Title>
							{user === "" ? (
								<></>
							) : (
								<AddFav user={user} id={item.idDrink} />
							)}
							<Card.Text>Type: {item.strAlcoholic}</Card.Text>
							<Card.Text>Category: {item.strCategory}</Card.Text>
							<Card.Text>
								Ingredients: {listIngredients}
							</Card.Text>
						</Card.Body>
					</Card>
				);
			});
			return <div className="drinkContainer">{element}</div>;
		}
	}

	render() {
		return this.formatCards();
	}
}
