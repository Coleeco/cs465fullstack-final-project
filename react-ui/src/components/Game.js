import React, {Component} from 'react'; //Import component from react for the class to extend from.
import { Grid, Row, Col } from 'react-flexbox-grid';
import glass from './glass.png'
import ingredient from './Ingredient.png'
import alcohol from './Alcohol.png'
import goal from './Goal.png'

const gameIngType = {
    GLASS: 'glass',
    ALCOHOL: 'alcohol',
    INGREDIENT: 'ingredient',
    SELECTALC: 'selalc',
    SELECTING: 'seling'
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
      
      goalAlcIng: [], //Goal Alc inggredints
      goalNonIng: [], //Goal Non Alc ingredients
      aIng: [], //array of alcoholic ingredients
      oIng: [], //array of non alocholic ingredients
      
      aUrl: [alcohol, alcohol, alcohol, alcohol, alcohol, alcohol], //array of url images for alcohol ingredients
      oUrl: [ingredient, ingredient, ingredient, ingredient, ingredient, ingredient], //array of url images for non alcohol ingredients
      
      extras: [],  //extra drinks data
      items: [{strDrinkThumb: goal, strDrink: "Cocktail"}], //Goal drink to make data

      preIng: "https://www.thecocktaildb.com/images/ingredients/",  //ingredient prefix address
      affIng: "-Small.png", //ingredient postfix address
      
      selectedGlass: -1,
      selectedAlcohols: [],
      selectedIngredients: [],

      glassError: 0,
      alcError: 0,
      nonError: 0,

      glassNames: ["glass type","glass type","glass type","glass type","glass type","glass type",],
      backgrounds: ["bg-success", "bg-success", "bg-success", "bg-success", "bg-success", "bg-success", "bg-primary", "bg-primary", "bg-primary", "bg-primary", "bg-primary", "bg-primary", "bg-info", "bg-info", "bg-info", "bg-info", "bg-info", "bg-info",]
    };
  };

  //Render an ingredient game piece
  renderIngredient(turl, tbg, tname ="Ingredient", i, tpieceType){
    return <GameIngredient  onClick={() => this.handleClick(i, tpieceType)} url = {turl} bg = {tbg} name = {tname} pieceType = {tpieceType}/>;
  };

  renderResults(data){
    const {goalNonIng,goalAlcIng, preIng, affIng, aIng, oIng} = this.state

    switch(data){
      default:
        console.log("ENUM not set for renderResults(data)");
        break;
      case gameIngType.INGREDIENT:        
        return (
          <div>
          <div className="d-flex flex-row justify-content-center">
            {goalNonIng.map((non) => (
              <div><img id="rimg" className="bg-warning border-1 m-1" type="image" alt={non}src={preIng + non + affIng}/></div>
            ))}
          </div>
          {goalNonIng.map((non) => (<div className ="text-center">{non}</div>))}
          </div>
        );
      case gameIngType.ALCOHOL:
        return (
          <div>
          <div className="d-flex flex-row justify-content-center">
            {goalAlcIng.map((alc) => (
              <div><img id="rimg" className="bg-warning border-1 m-1" type="image" alt={alc}src={preIng + alc + affIng}/></div>
            ))}
          </div>
            {goalAlcIng.map((alc) => (<div className ="text-center">{alc}</div>))}
          </div>
        );
      case gameIngType.SELECTALC:
        return (
          <div>
          <div className="d-flex flex-row justify-content-center">
            {this.state.selectedAlcohols.map((alc) => (
              <div><img id="rimg" className="bg-warning border-1 m-1" type="image" alt={aIng[alc]}src={preIng + aIng[alc] + affIng}/></div>
            ))}
          </div>
            {this.state.selectedAlcohols.map((alc) => (<div className ="text-center">{aIng[alc]}</div>))}
          </div>
        );
      case gameIngType.SELECTING:
        return (
          <div>
          <div className="d-flex flex-row justify-content-center">
            {this.state.selectedIngredients.map((non) => (
              <div><img id="rimg" className="bg-warning border-1 mx-auto" type="image" alt={oIng[non]}src={preIng + oIng[non] + affIng}/></div>
            ))}
          </div>
            {this.state.selectedIngredients.map((non) => (<div className ="text-center">{oIng[non]}</div>))}
          </div>
        );
    }
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
    let gerror = 0;
    let aerror = 0;
    let ierror = 0;

    if(glassNames[selectedGlass] === items[0].strGlass){
      ++count;
    }
    else{
      gerror = 1;
    }

    count = 0;
    for(var alcohols in selectedAlcohols){
      if(goalAlcIng.includes(aIng[alcohols])){
        ++count;
      }
    }
    aerror = (Math.abs(selectedAlcohols.length - count) + (Math.abs(goalAlcIng.length - count)));

    count = 0;
    for(var ingredients in selectedIngredients){
      if(goalNonIng.includes(oIng[ingredients])){
        ++count;
      }
    }
    ierror = (Math.abs(selectedIngredients.length - count) + (Math.abs(goalNonIng.length - count)));
    
    score = (count/total) * score;

    console.log(aerror);
    console.log(ierror);
    this.setState({
      finalScore: Number((score).toFixed(2)),
      submit: true,
      glassError: gerror,
      alcError: aerror,
      nonError: ierror
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
        <Grid fluid>
          <h3 className="d-flex justify-content-center">The drink to make </h3>
          <div className="d-flex justify-content-center">
            <input id="dimg" className="border-1 border-dark" type="image" alt="DrinkToMake" src={items[0].strDrinkThumb}/>
          </div>
          <h3 className="d-flex justify-content-center">{items[0].strDrink}</h3>
          <br></br>
          <Row>
            <Col xs md={4} className={"bg-success border d-flex flex-column justify-content-center"}>
              <h4 className="text-center">Correct Glass Type</h4>
              <img id="gimg" className="mx-auto" type="image" alt="Correct Glass" src={glass}/>
              <div className ="text-center">{items[0].strGlass}</div>
            </Col>
            <Col xs md={4} className={"bg-success border d-flex flex-column justify-content-center"}>
              <h4 className="text-center">Your Glass Type</h4>
              <img id="gimg" className="mx-auto" type="image" alt="Correct Glass" src={glass}/>
              <div className ="text-center">{glassNames[this.state.selectedGlass]}</div>
            </Col>
            <Col xs md={4} className={"bg-secondary border d-flex flex-column justify-content-center"}>
              <h4 className="text-center">Errors</h4>
              <h4 className="text-center">{this.state.glassError}</h4>
            </Col>
          </Row>
          <Row>
            <Col xs md={4} className={"bg-primary border d-flex flex-column justify-content-center"}>
              <h4 className="text-center">Correct Alcohol Ingredients</h4>
              {this.renderResults(gameIngType.ALCOHOL)}                         
            </Col>
            <Col xs md={4} className={"bg-primary border d-flex flex-column justify-content-center"}>
              <h4 className="text-center">Your Alcohol Ingredients</h4>
              {this.renderResults(gameIngType.SELECTALC)}                         
            </Col>
            <Col xs md={4} className={"bg-secondary border d-flex flex-column justify-content-center"}>
              <h4 className="text-center">Errors</h4>
              <h4 className="text-center">{this.state.alcError}</h4>
            </Col>
          </Row>
          <Row>
            <Col xs md={4} className={"bg-info border d-flex flex-column justify-content-center"}>
              <h4 className="text-center">Correct Non-Alcohol Ingredients</h4>
              {this.renderResults(gameIngType.INGREDIENT)}                         
            </Col>
            <Col xs md={4} className={"bg-info border d-flex flex-column justify-content-center"}>
              <h4 className="text-center">Your Non-Alcohol Ingredients</h4>
              {this.renderResults(gameIngType.SELECTING)}                         
            </Col>
            <Col xs md={4} className={"bg-secondary border d-flex flex-column justify-content-center"}>
              <h4 className="text-center">Errors</h4>
              <h4 className="text-center">{this.state.nonError}</h4>
            </Col>
          </Row>
          <Row>
            <Col xs md={12} className={"bg-danger border d-flex flex-column justify-content-center"}>
              <h4 className="text-center">Total Score</h4>
              <h4 className="text-center">{this.state.glassError}</h4>
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <button onClick={() => this.handleAgain()} >Mix Another Drink?</button>
          </div>
        </Grid>
      );
    };
  };
};

