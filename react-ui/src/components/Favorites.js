import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { postRequest } from "../ApiCaller";

const Favorites = () => {
  return (
    <div className="mt-d d-flex justify-content-center">
      <h3>Welcome to cocktail mastery! This is the favorites page!</h3>
      <AddFav user="Jordan" id="444444444" />
    </div>
  );
};

// function simulateNetworkRequest() {
//   return new Promise((resolve) => setTimeout(resolve, 2000));
// }

// function postAddFav(user, id) {
//   let favorite = {
//       username: user,
//       drinkid: id
//   }
//   console.log(favorite);
//   return postRequest("/user/favs/add", favorite)
//   .then((resolve) => setTimeout(resolve, 2000));
// }

// Button commponent to add drinkID to users favorites.
// Input: drinkid
// Result: POST to backend to add drink Id to users favorites
const AddFav = ({ user, id }) => {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  let favorite = {
    username: user,
    drinkid: id,
  };

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    if (adding) {
      delay(1500).then(() => {
        postRequest("/user/favs/add", favorite).then((resp) => {
          if (resp.ok) {
            setAdding(false);
            setAdded(true);
          } 
        });
      });
    }
  }, [adding]);

  const handleClick = () => setAdding(true);

  const btnText = added ? "Drink Added" : "Favorite Drink";

  return (
    <Button
      variant="outline-dark"
      disabled={adding | added}
      onClick={!adding ? handleClick : null}
    >
      {adding ? "Adding Drink..." : btnText}
    </Button>
  );
};

export default Favorites;
export { AddFav };