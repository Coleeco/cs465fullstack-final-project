import React from "react";
import "./Search.css";
import { Card } from "react-bootstrap";

function DrinkFilter(props) {
	let drink = [];
	if (props.data === null) {
		return <h1 id="SearchEmpty">No results found</h1>;
	} else if (props.data.length === 0) {
		return <h1 id="SearchEmpty">No results found</h1>;
	} else {
		let element = props.data.map((item, index) => {
			let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`;

			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					return data.drinks;
				})
				.then((drinks) => {
					drinks.forEach((item) => {
						drink.push(item);
					});
				})
				.catch((error) => console.log(error));
			console.log(drink);

			// return (
			// 	<Card>
			// 		<Card.Body>
			// 			<Card.Title>{drink[index].strDrink}</Card.Title>
			// 		</Card.Body>
			// 	</Card>
			// );
		});

		return <div className="drinkContainer">{element}</div>;
	}
}

// function parseIng(drink) {
// 	let listIngredients = "";
// 	for (var ingredient in drink) {
// 		var stringTemp = ingredient.split("strIngredient");
// 		if (stringTemp[0] === "" && drink[ingredient] != null) {
// 			if (ingredient === "strIngredient1") {
// 				listIngredients += drink[ingredient];
// 			} else {
// 				listIngredients += `, ${drink[ingredient]}`;
// 			}
// 		}
// 	}
// 	return listIngredients;
// }

function handleDrinkClick(drink) {
	console.log(drink.strDrink);
	return (
		<Card id="clickedDrinkCard">
			<Card.Img
				variant="top"
				src={drink.strDrinkThumb}
				alt={drink.strDrink}
			/>
			<Card.Body>
				<Card.Title>{drink.strDrink}</Card.Title>
				<Card.Text>Type: {drink.strAlcoholic}</Card.Text>
				<Card.Text>Category: {drink.strCategory}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default DrinkFilter;
