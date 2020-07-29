import React, {Component} from 'react'; //Import component from react for the class to extend from.
import { Grid, Row, Col } from 'react-flexbox-grid';
import glass from './glass.png'
import ingredient from './Ingredient.png'
import alcohol from './Alcohol.png'

function handleClick()
{
    console.log("HEY")
}
export class Game extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          aIng: [],
          oIng: [],
          preIng: "https://www.thecocktaildb.com/images/ingredients/",
          affIng: "-Small.png"
        };
      }
    
      componentDidMount() {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
              this.parseIng(result.drinks[0]);
            },
            
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
      
      //This function parses the ingredients of a random get drink api call
      //The ingredients are individually fetched and checked if they alcoholic or not
      //The state arrays aIng and oIng will have ingredients pushed to them respectively
      parseIng(result) {
        for (var ing in result){
          var temp = ing.split("strIngredient");
          if (temp[0] === "" && result[ing] != null)
          {
            fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + result[ing])
            .then(res => res.json())
            .then(
              (result) => {
                if(result.ingredients[0].strAlcohol != null){
                  this.state.aIng.push(result.ingredients[0].strIngredient);
                }
                else{
                  this.state.oIng.push(result.ingredients[0].strIngredient);
                }
              },       
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            )            
          }
           
        }
        console.log("Here is the non alcoholic ingredients I found: ");
        console.log(this.state.oIng);
        console.log("Here is the alcoholic ingredients I found: ");
        console.log(this.state.aIng);
        console.log("Here is an attempt to access the first index: ");
        console.log(this.state.aIng[0]);
      }

      render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <Grid fluid>
                <br></br>
                <Row>
                    <Col xs md={2} className="bg-success border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Glass" src={glass}/></Col>
                    <Col xs md={2} className="bg-success border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Glass" src={glass}/></Col>
                    <Col xs md={2} className="bg-success border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Glass" src={glass}/></Col>
                    <Col xs md={2} className="bg-success border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Glass" src={glass}/></Col>
                    <Col xs md={2} className="bg-success border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Glass" src={glass}/></Col>
                    <Col xs md={2} className="bg-success border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Glass" src={glass}/></Col>
                </Row>
                <Row>
                    <Col xs md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={this.state.preIng + items.drinks[0].strIngredient1 + this.state.affIng}/></Col>
                    <Col xs md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={this.state.preIng + items.drinks[0].strIngredient1 + this.state.affIng}/></Col>
                    <Col xs md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={this.state.preIng + items.drinks[0].strIngredient1 + this.state.affIng}/></Col>
                    <Col xs md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={this.state.preIng + items.drinks[0].strIngredient1 + this.state.affIng}/></Col>
                    <Col xs md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={alcohol}/></Col>
                    <Col xs md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={alcohol}/></Col>
                </Row>
                <Row>
                    <Col xs md={2} className="bg-info border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Ingredient" src={ingredient}/></Col>
                    <Col xs md={2} className="bg-info border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Ingredient" src={ingredient}/></Col>
                    <Col xs md={2} className="bg-info border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Ingredient" src={ingredient}/></Col>
                    <Col xs md={2} className="bg-info border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Ingredient" src={ingredient}/></Col>
                    <Col xs md={2} className="bg-info border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Ingredient" src={ingredient}/></Col>
                    <Col xs md={2} className="bg-info border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Ingredient" src={ingredient}/></Col>
                </Row>
                <br></br>
                <div className="m-5 d-flex justify-content-center">
                   <input id="dimg" className="border-1 border-dark" type="image" alt="DrinkToMake" src={items.drinks[0].strDrinkThumb}/>
                </div>
                <h3 className="d-flex justify-content-center">{items.drinks[0].strDrink}</h3>
            </Grid>
            
            
          );
        }
      }
    }

    /*{items.map(item => (
        <li key={item.name}>
          {item.name} {item.price}
        </li>
      ))}*/

    /*
    render(){
        return (
            <Grid fluid>
                <br></br>
              <Row>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Glass" src={glass}/></Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Glass" src={glass}/></Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Glass" src={glass}/></Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Glass" src={glass}/></Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Glass" src={glass}/></Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Glass" src={glass}/></Col>
              </Row>
              <Row>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={alcohol}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={alcohol}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={alcohol}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={alcohol}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={alcohol}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={alcohol}/></Col>
              </Row>
              <Row>
                <Col xs={1} md={2} className="bg-info border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-info border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-info border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-info border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-info border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-info border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Ingredient" src={ingredient}/></Col>
              </Row>
            </Grid>
          );
    }

}*/
