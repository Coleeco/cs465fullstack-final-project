import React from 'react';
import './Search.css';

function Drink(props) {
    let element = props.data.map((item, index) => {
        return (
            <div className='drink' key={index}>
                <h1>{item.strDrink}</h1>
                {/* TODO: Adjust image formatting */}
                <img src={item.strDrinkThumb} alt={item.strDrink} id='drinkImage' height='200px' width='200px'/>
            </div>
        );
    });

    return <div className='drinkContainer'>{element}</div>;
}

export default Drink;