import React, {Component} from 'react'; //Import component from react for the class to extend from.
import { Grid, Row, Col } from 'react-flexbox-grid';
import glass from './glass.png'
import ingredient from './Ingredient.png'
import alcohol from './Alcohol.png'

var testing = 0;
class GameIngredient extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      clicked: false,
      name: props.name,

    }
  }

  /*componentDidMount() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          items: result
        });
          this.parseIng(this.state.items.drinks[0]);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }*/

  handleClick(stuff)
  {
    console.log(stuff.name);
  }

  render() {
    const { url, bg, name } = this.props;
    return (
      <Col xs md={2} className={bg + " border d-flex justify-content-center"}><input id="gimg" onClick={() => console.log(name)} type="image" alt={name} src={url}/></Col>
    );
  }
};

export class Game extends Component {
  
  constructor(props) {
    super(props);
      this.state = {
        error: null,
        finished: false,
        preLoaded: false,
        isLoaded: false,
        extras: [],
        items: [],
        aIng: [], //array of alcoholic ingredients
        oIng: [], //array of non alocholic ingredients
        preIng: "https://www.thecocktaildb.com/images/ingredients/",  //ingredient prefix address
        affIng: "-Small.png", //ingredient postfix address
        aSize: 0,
        oSize: 0,
        glassBG: "bg-success",
        alcBG: "bg-primary",
        nonBG: "bg-info"
    };
  }

  //Render an ingredient game piece
  renderIngredient(turl, tbg, tname){
    return <GameIngredient url = {turl} bg = {tbg} name = {tname}/>;
  }
    
  //This function does the game setup fetches, once the state variable isloaded = true then all fetches have completed
  componentDidMount() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          items: result
        });
          this.parseIng(this.state.items.drinks[0]);
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
  parseIng(result, second = false) {
    if(testing > 5)
      return;
    ++testing;
    if(!second)
    {
      for (var ing in result){
        //Split the string data and check if this is a valid ingredient field
        var stemp = ing.split("strIngredient");
        if (stemp[0] === "" && result[ing] != null)
        {
          fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + result[ing])
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
              if (this.state.finished){
                this.setState({preLoaded: true});
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
    this.setState({finished: true});
    }
    else{
      this.setState({finished: false})
      for (var ting in result){
        //Split the string data and check if this is a valid ingredient field
        var sTemp = ting.split("strIngredient");
        if (sTemp[0] === "" && result[ting] != null)
        {
          fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + result[ting])
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
              if (this.state.finished){
                this.setState({isLoaded: true});
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
    this.setState({finished: true});
    }
  }

  notLoaded(){
    const { glassBG, alcBG, nonBG } = this.state;
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
        </Grid>        
    );
  }

  populateExtras(){

    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          extras: result
        });
          this.parseIng(this.state.extras.drinks[0], true);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    const { error, isLoaded, items,aIng,oIng, preIng, affIng, glassBG, alcBG, nonBG, preLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!preLoaded) {
      return (this.notLoaded());
    } 
    else if (!isLoaded && preLoaded) {
      this.populateExtras();
      return (this.notLoaded());
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
  }
}

   