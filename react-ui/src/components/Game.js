import React, {Component} from 'react'; //Import component from react for the class to extend from.

export class Game extends Component {

    render(){
        return(
            <div className="mt-d d-flex justify-content-center">
                <h3>Welcome to the cocktail game! This is the game page!</h3>
            </div>
        )
    }
}