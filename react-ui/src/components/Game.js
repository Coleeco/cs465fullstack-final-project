import React, {Component} from 'react'; //Import component from react for the class to extend from.
import { Grid, Row, Col } from 'react-flexbox-grid';
import glass from './glass.png'
import ingredient from './Ingredient.png'
import alcohol from './Alcohol.png'

class GameIngredient extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      clicked: false,
      name: props.name,
      /*isAnswer: props.answer,
      measure: props.measure,*/
    }
  }

  handleClick(data)
  {
    console.log(data.state.name);
  }

  render() {
    const { url, bg, name } = this.props;
    return (
      <Col xs md={2} className={bg + " border d-flex justify-content-center"}><input id="gimg" onClick={() => this.handleClick(this)} type="image" alt={name} src={url}/></Col>
    );
  }
};

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [], //Goal drink to make data
      aIng: [], //array of alcoholic ingredients
      oIng: [], //array of non alocholic ingredients
      extras: [],  //extra drink data
      preIng: "https://www.thecocktaildb.com/images/ingredients/",  //ingredient prefix address
      affIng: "-Small.png", //ingredient postfix address
      aSize: 0,
      oSize: 0,
      glassBG: "bg-success",
      alcBG: "bg-primary",
      nonBG: "bg-info"
    };
  };

  //Render an ingredient game piece
  renderIngredient(turl, tbg, tname){
    return <GameIngredient url = {turl} bg = {tbg} name = {tname}/>;
  };

  parseIngredients(drink){
    for (var ingredient in drink){
      var stringTemp = ingredient.split("strIngredient");
      if (stringTemp[0] === "" && drink[ingredient] != null)
      {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + drink[ingredient])
        .then(res => res.json())
        .then(
          (result) => {
            if(result.ingredients[0].strAlcohol != null){
              this.state.aIng.push(result.ingredients[0].strIngredient);
              this.setState({aSize: this.state.aSize + 1});
            }
            else{
              this.state.oIng.push(result.ingredients[0].strIngredient);
              this.setState({aSize: this.state.oSize + 1});
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
  };

  componentDidMount() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          items: result
        });
        this.parseIngredients(this.state.items.drinks[0]);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
    setTimeout(this.populateExtras(), 1000);
  }

  populateExtras(){
    for(let i = 0; i < 7; ++i){
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
          extras: result
        });
        this.parseIngredients(this.state.extras.drinks[0]);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      setTimeout(() => {this.setState({isLoaded: true}); }, 1000);
    };
  };

  render() {
    const { error, isLoaded, items,aIng,oIng, preIng, affIng, glassBG, alcBG, nonBG, preLoaded } = this.state;
    if(!isLoaded){
      return (
        <div>LOADING!</div>
        /*<Grid fluid>
          <br></br>
          <Row>
            {this.renderIngredient(glass, glassBG, "glass1")}
            {this.renderIngredient(glass, glassBG, "glass2")}
            {this.renderIngredient(glass, glassBG, "glass3")}
            {this.renderIngredient(glass, glassBG, "glass4")}
            {this.renderIngredient(glass, glassBG, "glass5")}
            {this.renderIngredient(glass, glassBG, "glass6")}
          </Row>
          <Row>
            {this.renderIngredient(alcohol, alcBG, "alcohol1")}
            {this.renderIngredient(alcohol, alcBG, "alcohol2")}
            {this.renderIngredient(alcohol, alcBG, "alcohol3")}
            {this.renderIngredient(alcohol, alcBG, "alcohol4")}
            {this.renderIngredient(alcohol, alcBG, "alcohol5")}
            {this.renderIngredient(alcohol, alcBG, "alcohol6")}
          </Row>
          <Row>
            {this.renderIngredient(ingredient, nonBG, "ingredient1")}
            {this.renderIngredient(ingredient, nonBG, "ingredient2")}
            {this.renderIngredient(ingredient, nonBG, "ingredient3")}
            {this.renderIngredient(ingredient, nonBG, "ingredient4")}
            {this.renderIngredient(ingredient, nonBG, "ingredient5")}
            {this.renderIngredient(ingredient, nonBG, "ingredient6")}
          </Row>
        </Grid>        */
      );
    }
    else {
      return (
        <Grid fluid>
          <br></br>
          <Row>
            {this.renderIngredient(glass, glassBG, "glass1")}
            {this.renderIngredient(glass, glassBG, "glass2")}
            {this.renderIngredient(glass, glassBG, "glass3")}
            {this.renderIngredient(glass, glassBG, "glass4")}
            {this.renderIngredient(glass, glassBG, "glass5")}
            {this.renderIngredient(glass, glassBG, "glass6")}
          </Row>
          <Row>
            {this.renderIngredient(preIng + aIng[0] + affIng, alcBG, aIng[0])}
            {this.renderIngredient(preIng + aIng[1] + affIng, alcBG, aIng[1])}
            {this.renderIngredient(preIng + aIng[2] + affIng, alcBG, aIng[2])}
            {this.renderIngredient(preIng + aIng[3] + affIng, alcBG, aIng[3])}
            {this.renderIngredient(preIng + aIng[4] + affIng, alcBG, aIng[4])}
            {this.renderIngredient(preIng + aIng[5] + affIng, alcBG, aIng[5])}
          </Row>
          <Row>
            {this.renderIngredient(preIng + oIng[0] + affIng, nonBG, oIng[0])}
            {this.renderIngredient(preIng + oIng[1] + affIng, nonBG, oIng[1])}
            {this.renderIngredient(preIng + oIng[2] + affIng, nonBG, oIng[2])}
            {this.renderIngredient(preIng + oIng[3] + affIng, nonBG, oIng[3])}
            {this.renderIngredient(preIng + oIng[4] + affIng, nonBG, oIng[4])}
            {this.renderIngredient(preIng + oIng[5] + affIng, nonBG, oIng[5])}
          </Row>
          <br></br>
          <div className="m-5 d-flex justify-content-center">
            <input id="dimg" className="border-1 border-dark" type="image" alt="DrinkToMake" src={items.drinks[0].strDrinkThumb}/>
          </div>
          <h3 className="d-flex justify-content-center">{items.drinks[0].strDrink}</h3>
        </Grid>        
      );
    }
  };
}