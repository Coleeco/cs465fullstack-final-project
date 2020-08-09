import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { postRequest, getRequest } from "../ApiCaller";
import { Card } from "react-bootstrap";

const Favorites = ({ user }) => {
  const loggedIn = user.loginname === "" ? false : true;
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      fetch(`/user/favs/${user.loginname}`)
        .then((resp) => resp.json())
        .then((data) => {
          setFavs([...data]);
        });
    }
  }, [loggedIn]);

<<<<<<< Updated upstream
const Favorites = ({ user }) => {
	return (
		<div className="d-flex justify-content-center">
			<h3>Welcome to cocktail mastery! This is the favorites page!</h3>
			<AddFav user="Jordan" id="444444444" />
		</div>
	);
};

=======
  return (
    <div className="mt-d d-flex justify-content-center">
      {loggedIn ? (
        <FavoritesList favs={favs} />
      ) : (
        <h3 className="my-2">Please login to use this feature</h3>
      )}
    </div>
  );
};

const FavoritesList = ({ favs, prop }) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if(!loaded){
    console.log(favs);
      favs.forEach((item) => {
        console.log(item);
        fetchFavData(item.drinkid);
      });
    }
  }, [favs]);

  const fetchFavData = (id) => {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      console.log(url);
      fetch(url)
        .then((resp) => resp.json())
        .then((drink) => {
          console.log(drink);
          setData([...data,drink])
        })
        .catch((error) => console.log(error));
      setLoaded(true);
  };

  const formatCards = () => {
    data.map((item, index) => {
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
        </Card>
      );
    });
  };

  return (
    <div container="mt-5">
      {data.length}
      {/* {loaded ? formatCards(): <NoFavsMsg />} */}
    </div>
  );
};

const NoFavsMsg = () => {
  return (
    <>
      <h5>No Cocktails Favorited</h5>
      <div className="mt-5">
        To add cocktails head over to the search page and click on the favorite
        button on any of the results
      </div>
    </>
  );
};

>>>>>>> Stashed changes
// Button commponent to add drinkID to users favorites.
// Input: drinkid
// Result: POST to backend to add drink Id to users favorites
const AddFav = ({ user, id }) => {
<<<<<<< Updated upstream
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
						console.log(`adding favorite ${favorite}`);
						setAdding(false);
						setAdded(true);
					}
				});
			});
		}
	}, [adding, favorite]);

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
=======
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
            console.log(`adding favorite ${favorite.drinkid} `);
            setAdding(false);
            setAdded(true);
          }
        });
      });
    }
  }, [adding, favorite]);

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
>>>>>>> Stashed changes
};

export default Favorites;
export { AddFav };
