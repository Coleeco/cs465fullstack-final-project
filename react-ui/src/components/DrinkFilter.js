import React, { Component } from "react"; //Import component from react for the class to extend from.
import "./Search.css";
import { Card, Modal, Button } from "react-bootstrap";
import { AddFav } from "./Favorites";

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
						</Card.Body>
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
