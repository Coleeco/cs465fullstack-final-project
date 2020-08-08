// import React, { Component } from "react";
// import "./Search.css";
// import { Card } from "react-bootstrap";

// function DrinkFilter(props) {
// 	// let drink = [];
// 	// let drinkName = [];
// 	if (props.data === null) {
// 		return <h1 id="SearchEmpty">No results found</h1>;
// 	} else if (props.data.length === 0) {
// 		return <h1 id="SearchEmpty">No results found</h1>;
// 	} else {
// 		let element = props.data.map((item, index) => {
// 			// let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`;

// 			// fetch(url)
// 			// 	.then((response) => response.json())
// 			// 	.then((data) => {
// 			// 		return data.drinks;
// 			// 	})
// 			// 	.then((drinks) => {
// 			// 		drinks.forEach((item) => {
// 			// 			drink[index] = item;
// 			// 		});
// 			// 	})
// 			// 	.catch((error) => console.log(error));

// 			// async function fetchSingle(url) {
// 			// 	try {
// 			// 		let response = await fetch(url);

// 			// 		if (response.status === 200) {
// 			// 			let data = await response.json();
// 			// 			addToDrink(data.drinks[0]);
// 			// 		}
// 			// 	} catch (error) {
// 			// 		console.log(error);
// 			// 	}
// 			// }

// 			// function addToDrink(data) {
// 			// 	drink[index] = data;
// 			// 	drinkName[index] = data.strDrink;
// 			// }

// 			// fetchSingle(url);
// 			// console.log(drinkName[index]);

// 			return (
// 				<Card
// 					id="drinkCard"
// 					onClick={() => handleDrinkClick(item)}
// 					key={index}
// 				>
// 					<Card.Img
// 						variant="top"
// 						src={item.strDrinkThumb}
// 						alt={item.strDrink}
// 					/>
// 					<Card.Body>
// 						<Card.Title>{item.strDrink}</Card.Title>
// 						{/* <Card.Text>Type: {item.strAlcoholic}</Card.Text>
// 						<Card.Text>Category: {item.strCategory}</Card.Text>
// 						<Card.Text>Ingredients: {listIngredients}</Card.Text> */}
// 					</Card.Body>
// 				</Card>
// 			);
// 		});
// 		return <div className="drinkContainer">{element}</div>;
// 	}
// }

// // function parseIng(drink) {
// // 	let listIngredients = "";
// // 	for (var ingredient in drink) {
// // 		var stringTemp = ingredient.split("strIngredient");
// // 		if (stringTemp[0] === "" && drink[ingredient] != null) {
// // 			if (ingredient === "strIngredient1") {
// // 				listIngredients += drink[ingredient];
// // 			} else {
// // 				listIngredients += `, ${drink[ingredient]}`;
// // 			}
// // 		}
// // 	}
// // 	return listIngredients;
// // }

// function handleDrinkClick(drink) {
// 	console.log(drink.strDrink);
// 	return (
// 		<Card id="clickedDrinkCard">
// 			<Card.Img
// 				variant="top"
// 				src={drink.strDrinkThumb}
// 				alt={drink.strDrink}
// 			/>
// 			<Card.Body>
// 				<Card.Title>{drink.strDrink}</Card.Title>
// 				<Card.Text>Type: {drink.strAlcoholic}</Card.Text>
// 				<Card.Text>Category: {drink.strCategory}</Card.Text>
// 			</Card.Body>
// 		</Card>
// 	);
// }

// export default DrinkFilter;
