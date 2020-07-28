import React from 'react';
import './Search.css';

function Drink(props) {
    let element = props.data.map((item, index) => {
        return (
            <div className='drink' key={index}>
                <h1>{item.strDrink}</h1>
                <img src={item.strDrinkThumb} alt={item.strDrink}/>
            </div>
        );
    });

    return <div className='container'>{element}</div>;
}

export default Drink;