import React from "react";
import "./Search.css";
import { Card } from "react-bootstrap";

function DrinkFilter(props) {
	let drink = [];
	if (props.data.lenth === 0) {
		return <h1 id="SearchEmpty">No results found</h1>;
	} else if (props.data === null) {
		return <h1 id="SearchEmpty">No results found</h1>;
	} else {
		props.data.map((item) => {
			let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`;

			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					drink.push(data);
				})
				.catch((error) => console.log(error));
		});

		// console.log(drink);
		console.log(Object.keys(drink));

		let element = drink.map((item, index) => {
			console.log("test");
		});
		// let element1 = drink.map((item1, index) => {
		// 	console.log("test");
		// 	console.log(item1.strDrink);

		// return (
		// 	<Card
		// 		id="drinkCard"
		// 		onClick={() => handleDrinkClick(item1)}
		// 		key={index}
		// 	>
		// 		<Card.Img
		// 			variant="top"
		// 			src={item1.strDrinkThumb}
		// 			alt={item1.strDrink}
		// 		/>
		// 		<Card.Body>
		// 			<Card.Title>{item1.strDrink}</Card.Title>
		// 			<Card.Text>Type: {item1.strAlcoholic}</Card.Text>
		// 			<Card.Text>Category: {item1.strCategory}</Card.Text>
		// 			{/* <Card.Text>Ingredients: {listIngredients}</Card.Text> */}
		// 		</Card.Body>
		// 	</Card>
		// );
		// });
		return <div className="drinkContainer">{element}</div>;
	}
}

// function fetchUrl(id) {
// 	let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
// 	let drink = [];

// 	fetch(url)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			returnData(data.drinks[0]);
// 		})
// 		.catch((error) => console.log(error));

// 	console.log(drink.drinks);
// }

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
