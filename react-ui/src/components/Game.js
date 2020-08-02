import React, {Component} from 'react'; //Import component from react for the class to extend from.
import { Grid, Row, Col } from 'react-flexbox-grid';
import glass from './glass.png'
import ingredient from './Ingredient.png'
import alcohol from './Alcohol.png'
import goal from './Goal.png'

class GameIngredient extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      clicked: false,
      name: props.name,
      isAnswer: false,
      measureType: "",
      measureAmount: 0
    }
  }

  handleClick()
  {
    this.setState({
      clicked: !this.state.clicked
    });
    console.log(this.props.name);
  }

  render() {
    const { url, bg, name } = this.props;  
    return (
      <Col xs md={2} className={bg + " border d-flex justify-content-center"}><input id="gimg" onClick={() => this.handleClick()} type="image" alt={name} src={url}/></Col>
    );
  }
};

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [{strDrinkThumb: goal, strDrink: "Cocktail"}], //Goal drink to make data
      goalAlcIng: [],
      goalNonIng: [],
      aIng: [], //array of alcoholic ingredients
      aUrl: [alcohol, alcohol, alcohol, alcohol, alcohol, alcohol], //array of url images for alcohol ingredients
      oUrl: [ingredient, ingredient, ingredient, ingredient, ingredient, ingredient], //array of url images for non alcohol ingredients
      oIng: [], //array of non alocholic ingredients
      extras: [],  //extra drinks data
      preIng: "https://www.thecocktaildb.com/images/ingredients/",  //ingredient prefix address
      affIng: "-Small.png", //ingredient postfix address
      glassBG: "bg-success",
      alcBG: "bg-primary",
      nonBG: "bg-info"
    };
  };

  //Render an ingredient game piece
  renderIngredient(turl, tbg, tname ="test"){
    return <GameIngredient url = {turl} bg = {tbg} name = {tname}/>;
  };

  parseIngredients(drink, goal = false){
    for (var ingredient in drink){
      var stringTemp = ingredient.split("strIngredient");
      if (stringTemp[0] === "" && drink[ingredient] != null)
      {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + drink[ingredient])
        .then(res => res.json())
        .then(
          (result) => {
            if(result.ingredients[0].strAlcohol != null) {
              this.state.aIng.push(result.ingredients[0].strIngredient);
              this.state.aUrl.push(this.state.preIng + result.ingredients[0].strIngredient + this.state.affIng);
              if(goal)
                this.state.goalAlcIng.push(result.ingredients[0].strIngredient);
            }
            else {
              this.state.oIng.push(result.ingredients[0].strIngredient);
              this.state.oUrl.push(this.state.preIng + result.ingredients[0].strIngredient + this.state.affIng);
              if(goal)
                this.state.goalNonIng.push(result.ingredients[0].strIngredient);
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
        this.state.items.shift();
        this.state.items.push(result.drinks[0]);
        this.parseIngredients(this.state.items[0]);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  this.populateExtras();
  }

  populateExtras(){
    for(let i = 0; i < 9; ++i){
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
    };
    setTimeout(() => {this.shiftArray();}, 1500);
  };

  shiftArray(){
    for (let i = 0; i < 6; ++i){
      this.state.aUrl.shift();
      this.state.oUrl.shift();
    }
    this.setState({isLoaded: true});
  }

  handleClick(){
    console.log("The current drink to make info is: ");
    console.log(this.state.items[0]);
  }

  render() {
    const { error, isLoaded, items, aIng, oIng, preIng, affIng, glassBG, alcBG, nonBG, preLoaded, aUrl, oUrl } = this.state;
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
        {this.renderIngredient(aUrl[0], alcBG, aIng[0])}
        {this.renderIngredient(aUrl[1], alcBG, aIng[1])}
        {this.renderIngredient(aUrl[2], alcBG, aIng[2])}
        {this.renderIngredient(aUrl[3], alcBG, aIng[3])}
        {this.renderIngredient(aUrl[4], alcBG, aIng[4])}
        {this.renderIngredient(aUrl[5], alcBG, aIng[5])}
      </Row>
      <Row>
        {this.renderIngredient(oUrl[0], nonBG, oIng[0])}
        {this.renderIngredient(oUrl[1], nonBG, oIng[1])}
        {this.renderIngredient(oUrl[2], nonBG, oIng[2])}
        {this.renderIngredient(oUrl[3], nonBG, oIng[3])}
        {this.renderIngredient(oUrl[4], nonBG, oIng[4])}
        {this.renderIngredient(oUrl[5], nonBG, oIng[5])}
      </Row>
        <div className="m-5 d-flex justify-content-center">
          <input id="dimg" className="border-1 border-dark" type="image" alt="DrinkToMake" src={items[0].strDrinkThumb}/>
        </div>
        <h3 className="d-flex justify-content-center">{items[0].strDrink}</h3>
        <button onClick={() => this.handleClick()}> Submit </button>
      </Grid>
    );
  }
}