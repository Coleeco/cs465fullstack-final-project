import React, {Component} from 'react'; //Import component from react for the class to extend from.
import './Search.css';
import Drink from './Drink.js';

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drinks: [],
            isLoaded: false,
        }

        this.randomFunction = this.randomFunction.bind(this);
    }

    searchFunction(event) {
        console.log("Hello world");
        event.preventDefault();
    }

    randomFunction(event) {
        let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.drinks);
                console.log(data.drinks[0].strDrink)
                this.setState({
                    drinks: data.drinks,
                    isLoaded: true,
                });
            })
            .catch((error) => console.log(error));

            event.preventDefault();
    }

    render(){
        const { drinks, isLoaded } = this.state;

        return(
            <React.Fragment>
                <div className="mt-d d-flex justify-content-center">
                    <form className="cocktail-search">
                        <h3>Welcome to cocktail search!</h3>
                        <div class="form-search">
                            <input id="search" placeholder="Seach a cocktail by name" />
                        </div>
                        <div class="btnrow">
                            <button onClick={this.searchFunction} type="submit">Search</button>
                            <button onClick={this.randomFunction} >Random</button>
                        </div>
                    </form>
                </div>
                
                <Drink data={drinks} />
                
            </React.Fragment>
        )
    }
}