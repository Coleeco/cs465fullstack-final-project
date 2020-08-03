import React, {Component} from 'react'; //Import component from react for the class to extend from.
import { Grid, Row, Col } from 'react-flexbox-grid';
import glass from './glass.png'
import ingredient from './Ingredient.png'
import alcohol from './Alcohol.png'
import goal from './Goal.png'

const gameIngType = {
    GLASS: 'glass',
    ALCOHOL: 'alcohol',
    INGREDIENT: 'ingredient'
}

class GameIngredient extends Component{
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    }
  };

  render() {
    const { url, bg, name } = this.props;  
    return (
      <Col xs md={2} onClick={() => this.props.onClick()}  className={bg + " border d-flex flex-column justify-content-center"}>
          <img id="gimg" className="mx-auto" type="image" alt={name} src={url}/>
          <div className ="text-center">{name}</div>
      </Col>
    );
  }
};

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      submit: false,
      finalScore: 0,
      items: [{strDrinkThumb: goal, strDrink: "Cocktail"}], //Goal drink to make data
      goalAlcIng: [], //Goal Alc inggredints
      goalNonIng: [], //Goal Non Alc ingredients
      aIng: [], //array of alcoholic ingredients
      glassNames: ["glass type","glass type","glass type","glass type","glass type","glass type",],
      aUrl: [alcohol, alcohol, alcohol, alcohol, alcohol, alcohol], //array of url images for alcohol ingredients
      oUrl: [ingredient, ingredient, ingredient, ingredient, ingredient, ingredient], //array of url images for non alcohol ingredients
      oIng: [], //array of non alocholic ingredients
      extras: [],  //extra drinks data
      preIng: "https://www.thecocktaildb.com/images/ingredients/",  //ingredient prefix address
      affIng: "-Small.png", //ingredient postfix address
      selectedGlass: -1,
      selectedAlcohols: [],
      selectedIngredients: [],

      backgrounds: ["bg-success", "bg-success", "bg-success", "bg-success", "bg-success", "bg-success", "bg-primary", "bg-primary", "bg-primary", "bg-primary", "bg-primary", "bg-primary", "bg-info", "bg-info", "bg-info", "bg-info", "bg-info", "bg-info",]
    };
  };

  //Render an ingredient game piece
  renderIngredient(turl, tbg, tname ="Ingredient", i, tpieceType){
    return <GameIngredient  onClick={() => this.handleClick(i, tpieceType)} url = {turl} bg = {tbg} name = {tname} pieceType = {tpieceType}/>;
  };

  handleClick(i, ptype){    
    let temp = this.state.backgrounds;
    switch(ptype){
      default:
        console.log("ERROR in handleClick() enum not set")
        break;
      case gameIngType.GLASS:
        if (this.state.selectedGlass > -1){
          temp[this.state.selectedGlass] = "bg-success"
          temp[i] = "bg-warning"
          this.setState({
            backgrounds: temp,
            selectedGlass: i
          });
        }
        else {
          temp[i] = "bg-warning"
          this.setState({
            backgrounds: temp,
            selectedGlass: i
          });
        }      
        break;

      case gameIngType.ALCOHOL:
        if (this.state.selectedAlcohols.includes(i)){
          for( let x = 0; x < this.state.selectedAlcohols.length; ++x){ 
            if ( this.state.selectedAlcohols[x] === i) { 
              this.state.selectedAlcohols.splice(x, 1); 
              --x; 
            }
          }
          temp[i+6] = "bg-primary"
        }
        else {
          temp[i+6] = "bg-warning"
          this.state.selectedAlcohols.push(i); 
        }
        this.setState({
          backgrounds: temp
        });
        break;

      case gameIngType.INGREDIENT:
        if (this.state.selectedIngredients.includes(i)){
          for( let x = 0; x < this.state.selectedIngredients.length; ++x){ 
            if ( this.state.selectedIngredients[x] === i) { 
              this.state.selectedIngredients.splice(x, 1); 
              --x; 
            }
          }
          temp[i+12] = "bg-info"
        }
        else{
          temp[i+12] = "bg-warning"
          this.state.selectedIngredients.push(i);
        }
        this.setState({
          backgrounds: temp
        });
        break;
    }
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
        this.state.glassNames.push(result.drinks[0].strGlass);
        this.state.items.shift();
        this.state.items.push(result.drinks[0]);
        this.parseIngredients(this.state.items[0], true);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
    this.populateExtras();
    this.populateGlasses();
  };

  populateGlasses(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list")
    .then(res => res.json())
    .then(
      (result) => {
        for(let i = 0; i < 5; ++i)
        {
          this.state.glassNames.push(result.drinks[Math.floor(Math.random() * result.drinks.length)].strGlass)
        }
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  };

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
      this.state.glassNames.shift();
    }
    this.setState({isLoaded: true});
  };

  handleSubmit(){
    let {glassNames, selectedGlass, items, selectedAlcohols, selectedIngredients, aIng, oIng, goalAlcIng, goalNonIng} = this.state;
    let count = 0;
    let score = 100.0;
    let total = goalAlcIng.length + goalNonIng.length + 1;
    
    if(glassNames[selectedGlass] === items[0].strGlass){
      ++count;
    }

    for(var alcohols in selectedAlcohols){
      if(goalAlcIng.includes(aIng[alcohols])){
        ++count;
      }
    }
    
    for(var ingredients in selectedIngredients){
      if(goalNonIng.includes(oIng[ingredients])){
        ++count;
      }
    }
    
    score = (count/total) * score;

    this.setState({
      finalScore: Number((score).toFixed(2)),
      submit: true
    })
  };

  handleAgain(){
    window.location.reload(true);
  }

  render() {
    const { error, submit, items, aIng, oIng, aUrl, oUrl, glassNames, backgrounds, finalScore } = this.state;
    if(error)
    {
      console.log(error);
      return(
        <div>An error occured trying to access cocktailDB API</div>
      )
    }
    else if(!submit) {
      return (
        <Grid fluid>
        <br></br>
        <Row>
          {this.renderIngredient(glass, backgrounds[0], glassNames[0], 0, gameIngType.GLASS)}
          {this.renderIngredient(glass, backgrounds[1], glassNames[1], 1, gameIngType.GLASS)}
          {this.renderIngredient(glass, backgrounds[2], glassNames[2], 2, gameIngType.GLASS)}
          {this.renderIngredient(glass, backgrounds[3], glassNames[3], 3, gameIngType.GLASS)}
          {this.renderIngredient(glass, backgrounds[4], glassNames[4], 4, gameIngType.GLASS)}
          {this.renderIngredient(glass, backgrounds[5], glassNames[5], 5, gameIngType.GLASS)}
        </Row>
        <Row>
          {this.renderIngredient(aUrl[0], backgrounds[6], aIng[0], 0, gameIngType.ALCOHOL)}
          {this.renderIngredient(aUrl[1], backgrounds[7], aIng[1], 1, gameIngType.ALCOHOL)}
          {this.renderIngredient(aUrl[2], backgrounds[8], aIng[2], 2, gameIngType.ALCOHOL)}
          {this.renderIngredient(aUrl[3], backgrounds[9], aIng[3], 3, gameIngType.ALCOHOL)}
          {this.renderIngredient(aUrl[4], backgrounds[10], aIng[4], 4, gameIngType.ALCOHOL)}
          {this.renderIngredient(aUrl[5], backgrounds[11], aIng[5], 5, gameIngType.ALCOHOL)}
        </Row>
        <Row>
          {this.renderIngredient(oUrl[0], backgrounds[12], oIng[0], 0, gameIngType.INGREDIENT)}
          {this.renderIngredient(oUrl[1], backgrounds[13], oIng[1], 1, gameIngType.INGREDIENT)}
          {this.renderIngredient(oUrl[2], backgrounds[14], oIng[2], 2, gameIngType.INGREDIENT)}
          {this.renderIngredient(oUrl[3], backgrounds[15], oIng[3], 3, gameIngType.INGREDIENT)}
          {this.renderIngredient(oUrl[4], backgrounds[16], oIng[4], 4, gameIngType.INGREDIENT)}
          {this.renderIngredient(oUrl[5], backgrounds[17], oIng[5], 5, gameIngType.INGREDIENT)}
        </Row>
          <div className="m-5 d-flex justify-content-center">
            <input id="dimg" className="border-1 border-dark" type="image" alt="DrinkToMake" src={items[0].strDrinkThumb}/>
          </div>
          <h3 className="d-flex justify-content-center">{items[0].strDrink}</h3>
          <button onClick={() => this.handleSubmit()}> Submit </button>
        </Grid>
      );
    }
    else{
      return(
        <div> 
          <div>
            Your score is : {finalScore}
          </div>
        
          <div> 
            Drink to make: {items[0].strDrink} 
          </div>
          <br></br>
          <div> 
            Correct glass type: {items[0].strGlass}
          </div>
          <div>
            Your glass choice: {glassNames[this.state.selectedGlass]} 
          </div>
          <br></br>
          <div>
            Correct Alcohol Choices: {this.state.goalAlcIng}
          </div>
          <div>
            You Alcohol Choices: {this.state.selectedAlcohols}
          </div>
          <div>
            Correct Ingredient Choices: {this.state.goalNonIng}
          </div>
          <div>
            You Alcohol Choices: {this.state.selectedIngredients}
          </div>
          <button onClick={() => this.handleAgain()}> Again? </button>
        </div>
      );
    };
  };
};