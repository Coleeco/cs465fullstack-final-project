import React from "react";
import "./Search.css";
import { Card } from "react-bootstrap";

function Drink(props) {
	if (props.data === null) {
		return <h1>No results found</h1>;
	} else {
		let element = props.data.map((item, index) => {
			return (
				<Card style={{ width: "32%" }}>
					{/* TODO: Change style */}
					<Card.Img
						variant="top"
						src={item.strDrinkThumb}
						alt={item.strDrink}
					/>
					<Card.Body>
						<Card.Title>{item.strDrink}</Card.Title>
						<Card.Text>Type: {item.strAlcoholic}</Card.Text>
						<Card.Text>
							Ingredients: {item.strIngredient1},{" "}
							{item.strIngredient2}, {item.strIngredient3}
						</Card.Text>
					</Card.Body>
				</Card>
			);
		});
		return <div className="drinkContainer">{element}</div>;
	}
}

export default Drink;
