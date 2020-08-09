import React, { Component } from "react"; //Import component from react for the class to extend from.
import "./Search.css";
import { Card, Modal, Button } from "react-bootstrap";
import { AddFav } from "./Favorites";

export class SearchDrinkFilterModal extends Component {
	constructor(props) {
		super(props);
		// State elements for each of the items to display for the modal
		this.state = {
			modalShow: false, // When true, modal will show
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

	// Update modal values with input variables
	modalUpdate(title) {
		this.setState({
			modalTitle: title,
		});
	}

	render() {
		return (
			// Modal with all of the drink information to be displayed when clicked
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

	// Whenever a drink is clicked, update the modal and show with all additional information
	handleDrinkClick(item) {
		this.props.modalUpdate(item.strDrink);
		this.props.showModal();
	}

	// Format Cards for printing results in the search bar
	formatCards() {
		let user = this.props.user.loginname;
		// Error checking, if the data is empty
		if (this.props.data === null) {
			return <h1 id="searchEmpty">No results found</h1>;
		} else {
			let element = this.props.data.map((item, index) => {
				return (
					// Clickable card, clicking expands all of the information in modal
					<Card id="drinkCard" key={index}>
						<Card.Img
							variant="top"
							src={item.strDrinkThumb}
							alt={item.strDrink}
							onClick={() => this.handleDrinkClick(item)}
						/>
						<Card.Body>
							<Card.Title>{item.strDrink}</Card.Title>
						</Card.Body>
						{/* If logged in, add a footer with an add favorites button */}
						{user === "" ? (
							<></>
						) : (
							<Card.Footer>
								<AddFav user={user} id={item.idDrink} />
							</Card.Footer>
						)}
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
