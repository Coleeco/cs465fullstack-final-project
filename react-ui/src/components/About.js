import React, { Component } from "react"; //Import component from react for the class to extend from.
import { Card } from "react-bootstrap";
import glass from "./glass.png";
import "./About.css";
export class About extends Component {
	render() {
		return (
			<React.Fragment>
				<h1 id="aboutH1">About the Authors</h1>
				<div className="mt-d d-flex justify-content-center">
					<Card id="aboutCard">
						<Card.Img
							variant="top"
							src={glass}
							alt="Favorite Drink"
						/>
						<Card.Body>
							<Card.Title>Jordan Co</Card.Title>
							<Card.Text>Filler</Card.Text>
						</Card.Body>
					</Card>

					<Card id="aboutCard">
						<Card.Img
							variant="top"
							src={glass}
							alt="Favorite Drink"
						/>
						<Card.Body>
							<Card.Title>Todd Graham</Card.Title>
							<Card.Text>Filler</Card.Text>
						</Card.Body>
					</Card>

					<Card id="aboutCard">
						<Card.Img
							variant="top"
							src={glass}
							alt="Favorite Drink"
						/>
						<Card.Body>
							<Card.Title>Erik Jastad</Card.Title>
							<Card.Text>Filler</Card.Text>
						</Card.Body>
					</Card>
				</div>
			</React.Fragment>
		);
	}
}
