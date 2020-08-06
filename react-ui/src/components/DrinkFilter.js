import React from "react";
import "./Search.css";
import { Card } from "react-bootstrap";

function DrinkFilter(props) {
	if (props.data === null) {
		return <h1 id="SearchEmpty">No results found</h1>;
	} else {
		let element = props.data.map((item, index) => {
			return (
				<Card
					id="drinkCard"
					onClick={() => handleDrinkClick(item)}
					key={index}
				>
					<Card.Img
						variant="top"
						src={item.strDrinkThumb}
						alt={item.strDrink}
					/>
					<Card.Body>
						<Card.Title>{item.strDrink}</Card.Title>
					</Card.Body>
				</Card>
			);
		});
		return <div className="drinkContainer">{element}</div>;
	}
}

function handleDrinkClick(drink) {
	console.log(drink.strDrink);
	let listIngredients = parseIng(drink);
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
