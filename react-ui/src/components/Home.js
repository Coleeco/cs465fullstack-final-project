import React, {Component} from 'react'; //Import component from react for the class to extend from.

export class Home extends Component {

    render(){
        return(
            <div className="mt-d d-flex justify-content-center">
                <h3>Welcome to cocktail mastery! This is the home page!</h3>
            </div>
        )
    }
}