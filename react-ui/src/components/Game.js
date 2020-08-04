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
    SELECTING: 'seling',
}

class GameIngredient extends Component{
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    }
  };

  render() {
    const { url, bg, name, myIndex, aurl } = this.props;  
    if(aurl === glass || aurl === ingredient || aurl === alcohol){
      return (
        <Col xs md={2} onClick={() => this.props.onClick()}  className={bg[myIndex] + " border d-flex flex-column justify-content-center"}>
          <img id="gimg" className="mx-auto" type="image" alt={name} src={aurl}/>
          <div className ="text-center">{name}</div>
        </Col>
      );
    }
    else{
      return (
        <Col xs md={2} onClick={() => this.props.onClick()}  className={bg[myIndex] + " border d-flex flex-column justify-content-center"}>
          <img id="gimg" className="mx-auto" type="image" alt={name} src={url}/>
          <div className ="text-center">{name}</div>
        </Col>
      );
    }
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

      correctSelAlc: [],
      incorrectSelAlc: [],
      correctSelNon: [],
      incorrectSelNon: [],

      glassError: 0,
      alcError: 0,
      nonError: 0,

      gi: 0,
      ai: 0,
      ni: 0,

      gBGc: "bg-success",
      aBGc: "bg-primary",
      iBGc: "bg-info",
      wBGc: "bg-warning",
      dBGc: "bg-danger",

      glassNames: ["glass type","glass type","glass type","glass type","glass type","glass type",],
      abg: ["bg-primary", "bg-primary", "bg-primary", "bg-primary", "bg-primary", "bg-primary"],
      ibg: ["bg-info", "bg-info", "bg-info", "bg-info", "bg-info", "bg-info"],
      gbg: ["bg-success", "bg-success", "bg-success", "bg-success", "bg-success", "bg-success"]
    };
  };

  //Render an ingredient game piece
  renderIngredient(turl, tbg, tname ="Ingredient", i, tpieceType){
    return <GameIngredient  onClick={() => this.handleClick(i, tpieceType)} url = {this.state.preIng + tname + this.state.affIng} bg = {tbg} name = {tname} pieceType = {tpieceType} myIndex={i} aurl = {turl}/>;
  };

  renderResults(data){
    const {goalNonIng,goalAlcIng, preIng, affIng} = this.state

    switch(data){
      default:
        console.log("ENUM not set for renderResults(data)");
        break;
      case gameIngType.INGREDIENT:        
        return (
          <div>
            <div className="d-flex flex-row justify-content-center">
              {goalNonIng.map((non) => (
                <div key = {non} ><img id="rimg" className="bg-warning border-1 m-1" type="image" alt={non}src={preIng + non + affIng}/></div>
              ))}
            </div>
            {goalNonIng.map((non) => (<div key = {non} className ="text-center">{non}</div>))}
          </div>
        );
      case gameIngType.ALCOHOL:
        return (
          <div>
            <div className="d-flex flex-row justify-content-center">
              {goalAlcIng.map((alc) => (
                <div key = {alc}><img id="rimg" className="bg-warning border-1 m-1" type="image" alt={alc}src={preIng + alc + affIng}/></div>
              ))}
            </div>
            {goalAlcIng.map((alc) => (<div key = {alc} className ="text-center">{alc}</div>))}
          </div>
        );
      case gameIngType.SELECTALC:
        return (
          <div>
           <div className="d-flex flex-row justify-content-center">
              {this.state.correctSelAlc.map((alc) => (
                <div key = {alc}><img id="rimg" className="bg-warning border-1 m-1" type="image" alt={alc}src={preIng + alc + affIng}/></div>
              ))}
              {this.state.incorrectSelAlc.map((alc) => (
                <div key = {alc}><img id="rimg" className="bg-danger border-1 m-1" type="image" alt={alc}src={preIng + alc + affIng}/></div>
              ))}
            </div>
            {this.state.correctSelAlc.map((alc) => (<div key = {alc} className ="text-center">{alc}</div>))}
            {this.state.incorrectSelAlc.map((alc) => (<div key = {alc} className ="text-center">{alc}</div>))}
          </div>
        );
      case gameIngType.SELECTING:
        return (
          <div>
            <div className="d-flex flex-row justify-content-center">
              {this.state.correctSelNon.map((non) => (
                <div key = {non} ><img id="rimg" className="bg-warning border-1 mx-1" type="image" alt={non} src={preIng + non + affIng}/></div>
              ))}
              {this.state.incorrectSelNon.map((non) => (
                <div key = {non} ><img id="rimg" className="bg-danger border-1 mx-1" type="image" alt={non} src={preIng + non + affIng}/></div>
              ))}
            </div>
            {this.state.correctSelNon.map((non) => (<div key = {non} className ="text-center">{non}</div>))}
            {this.state.incorrectSelNon.map((non) => (<div key = {non} className ="text-center">{non}</div>))}
          </div>
        );
    }
  };

  handleClick(i, ptype){    
    if(!this.state.isLoaded)
    {
      return;
    }

    let atemp = this.state.abg;
    let itemp = this.state.ibg;
    let gtemp = this.state.gbg;
    switch(ptype){
      default:
        console.log("ERROR in handleClick() enum not set")
        break;
      case gameIngType.GLASS:
        if (this.state.selectedGlass > -1){
          gtemp[this.state.selectedGlass] = "bg-success"
          gtemp[i] = "bg-warning"
          this.setState({
            gbg: gtemp,
            selectedGlass: i
          });
        }
        else {
          gtemp[i] = "bg-warning"
          this.setState({
            gbg: gtemp,
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
          atemp[i] = "bg-primary"
        }
        else {
          atemp[i] = "bg-warning"
          this.state.selectedAlcohols.push(i); 
        }
        this.setState({
          abg: atemp
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
          itemp[i] = "bg-info"
        }
        else{
          itemp[i] = "bg-warning"
          this.state.selectedIngredients.push(i);
        }
        this.setState({
          ibg: itemp
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
            if(result.ingredients[0].strAlcohol && !this.state.aIng.includes(result.ingredients[0].strIngredient)) {
              this.state.aIng.push(result.ingredients[0].strIngredient);
              this.state.aUrl.push(this.state.preIng + result.ingredients[0].strIngredient + this.state.affIng);
              this.state.abg.push(this.state.aBGc);
              if(goal)
                this.state.goalAlcIng.push(result.ingredients[0].strIngredient);
            }
            else if (!this.state.oIng.includes(result.ingredients[0].strIngredient) && result.ingredients[0].strAlcohol != "Yes"){
              this.state.oIng.push(result.ingredients[0].strIngredient);
              this.state.oUrl.push(this.state.preIng + result.ingredients[0].strIngredient + this.state.affIng);
              this.state.ibg.push(this.state.iBGc);
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
        this.state.gbg.push(this.state.gBGc);
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
    setTimeout(() => {this.populateExtras();}, 200);
    setTimeout(() => {this.populateGlasses();}, 200);
  };

  populateGlasses(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list")
    .then(res => res.json())
    .then(
      (result) => {
        for(let i = 0; i < 30; ++i)
        {
          let tempglass = result.drinks[Math.floor(Math.random() * (result.drinks.length-1))].strGlass
          if(!this.state.glassNames.includes(tempglass)){
            this.state.glassNames.push(tempglass)
            this.state.gbg.push(this.state.gBGc);
          }
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
    setTimeout(() => {this.shiftArray();}, 2000);
  };

  //Last function called before considered loaded
  shiftArray(){
    for (let i = 0; i < 6; ++i){
      this.state.aUrl.shift();
      this.state.oUrl.shift();
      this.state.glassNames.shift();
    }

    let goalGlass = this.state.glassNames.shift();
    this.state.glassNames.splice(Math.floor(Math.random() * (this.state.glassNames.length-1)),0, goalGlass);
    
    for(let i = 0; i < this.state.goalAlcIng.length; ++i )
    {
      let goalAlc = this.state.aIng.shift();
      this.state.aIng.splice(Math.floor(Math.random() * (this.state.aIng.length-1)),0, goalAlc);

      let alcURL = this.state.aUrl.shift();
      this.state.aUrl.splice(Math.floor(Math.random() * (this.state.aUrl.length-1)),0, alcURL);
    };

    for(let i = 0; i < this.state.goalNonIng.length; ++i )
    {
      let goalIng = this.state.oIng.shift();
      this.state.oIng.splice(Math.floor(Math.random() * (this.state.oIng.length-1)),0, goalIng);

      let nonURL = this.state.oUrl.shift();
      this.state.oUrl.splice(Math.floor(Math.random() * (this.state.oUrl.length-1)),0, nonURL);
    };

    this.setState({isLoaded: true});
  };

  handleSubmit(){
    if(!this.state.isLoaded)
    {
      return;
    }

    if(this.state.selectedGlass < 0)
    {
      alert("Please Select a Glass!");
      return;
    }

    if(this.state.selectedAlcohols.length === 0 && this.state.selectedIngredients.length === 0)
    {
      alert("Please Select an Inredient!");
      return;
    }
    let {glassNames, selectedGlass, items, selectedAlcohols, selectedIngredients, aIng, oIng, goalAlcIng, goalNonIng} = this.state;
    let score = 100.0;
    let total = goalAlcIng.length + goalNonIng.length + 1;
    let gerror = 0;
    let aerror = 0;
    let nerror = 0;
    let correctAlc = [];
    let incorrectAlc = [];
    let correctIng = [];
    let incorrectIng = [];

    if(glassNames[selectedGlass] === items[0].strGlass){
      gerror = 0;
    }
    else{
      gerror = 1;
    }

    for (var alcs in selectedAlcohols)
    {
      if(goalAlcIng.includes(aIng[selectedAlcohols[alcs]])){
        correctAlc.push(aIng[selectedAlcohols[alcs]]);
      }
      else{
        incorrectAlc.push(aIng[selectedAlcohols[alcs]]);
      }
    }

    for (var ings in selectedIngredients)
    {
      if(goalNonIng.includes(oIng[selectedIngredients[ings]])){
        correctIng.push(oIng[selectedIngredients[ings]]);
      }
      else{
        incorrectIng.push(oIng[selectedIngredients[ings]]);
      }
    }

    aerror = ((goalAlcIng.length - correctAlc.length) + incorrectAlc.length);
    nerror = ((goalNonIng.length - correctIng.length) + incorrectIng.length);
    score = Math.max(100.0 - ((100.0 * (aerror + nerror + gerror)/total)), 0);

    this.setState({
      finalScore: Number((score).toFixed(2)),
      submit: true,
      glassError: gerror,
      alcError: aerror,
      nonError: nerror,
      correctSelAlc: correctAlc,
      incorrectSelAlc: incorrectAlc,
      correctSelNon: correctIng,
      incorrectSelNon: incorrectIng
    })

    console.log(aIng);
    console.log(oIng);
    console.log(glassNames)
  };

  handleAgain(){
    window.location.reload(true);
  }

  handleLR(data, direction){
    if(!this.state.isLoaded)
    {
      return;
    }

    const { glassNames, aIng, oIng, ai, gi, ni } = this.state;
    switch(data){
      default:
        console.log("ENUM not set for handleLR(data)");
        break;

      case gameIngType.INGREDIENT:
        if(direction){
          if(ni === (oIng.length-5)){
            return;
          }
          else{
            this.setState({
              ni: (this.state.ni+1)
            })
          }
        }
        else{
          if(ni === 0){
            return;
          }
          else{
            this.setState({
              ni: (this.state.ni-1)
            })
          }
        }
        break;

      case gameIngType.GLASS:
        if(direction){
          if(gi === (glassNames.length-5)){
            return;
          }
          else{
            this.setState({
              gi: (this.state.gi+1)
            })
          }
        }
        else{
          if(gi === 0){
            return;
          }
          else{
            this.setState({
              gi: (this.state.gi-1)
            })
          }
        }
        break;

      case gameIngType.ALCOHOL:
        if(direction){
          if(ai === (aIng.length-5)){
            return;
          }
          else{
            this.setState({
              ai: (this.state.ai+1)
            })
          }
        }
        else{
          if(ai === 0){
            return;
          }
          else{
            this.setState({
              ai: (this.state.ai-1)
            })
          }
        }
        break;
    }
  }

  render() {
    const { error, submit, items, aIng, oIng, aUrl, oUrl, glassNames, finalScore, ai, ni, gi, abg, gbg, ibg } = this.state;
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
          <Col xs md={1} className={"border d-flex flex-column justify-content-center"}>
            <button onClick={() => this.handleLR(gameIngType.GLASS, false)}>Left</button>
          </Col>
          {this.renderIngredient(glass, gbg, glassNames[gi], gi, gameIngType.GLASS)}
          {this.renderIngredient(glass, gbg, glassNames[gi+1], gi+1, gameIngType.GLASS)}
          {this.renderIngredient(glass, gbg, glassNames[gi+2], gi+2, gameIngType.GLASS)}
          {this.renderIngredient(glass, gbg, glassNames[gi+3], gi+3, gameIngType.GLASS)}
          {this.renderIngredient(glass, gbg, glassNames[gi+4], gi+4, gameIngType.GLASS)}
          
          <Col xs md={1} className={"border d-flex flex-column justify-content-center"}>
            <button onClick={() => this.handleLR(gameIngType.GLASS, true)}>Right</button>
          </Col>
        </Row>
        <Row>
          <Col xs md={1} className={"border d-flex flex-column justify-content-center"}>
            <button onClick={() => this.handleLR(gameIngType.ALCOHOL, false)}>Left</button>
          </Col>
          {this.renderIngredient(aUrl[ai], abg, aIng[ai], ai, gameIngType.ALCOHOL)}
          {this.renderIngredient(aUrl[ai+1], abg, aIng[ai+1], ai+1, gameIngType.ALCOHOL)}
          {this.renderIngredient(aUrl[ai+2], abg, aIng[ai+2], ai+2, gameIngType.ALCOHOL)}
          {this.renderIngredient(aUrl[ai+3], abg, aIng[ai+3], ai+3, gameIngType.ALCOHOL)}
          {this.renderIngredient(aUrl[ai+4], abg, aIng[ai+4], ai+4, gameIngType.ALCOHOL)}
          <Col xs md={1} className={"border d-flex flex-column justify-content-center"}>
            <button onClick={() => this.handleLR(gameIngType.ALCOHOL, true)}>Right</button>
          </Col>
        </Row>
        <Row>
        <Col xs md={1} className={"border d-flex flex-column justify-content-center"}>
            <button onClick={() => this.handleLR(gameIngType.INGREDIENT, false)}>Left</button>
          </Col>
          {this.renderIngredient(oUrl[ni], ibg, oIng[ni], ni, gameIngType.INGREDIENT)}
          {this.renderIngredient(oUrl[ni+1], ibg, oIng[ni+1], ni+1, gameIngType.INGREDIENT)}
          {this.renderIngredient(oUrl[ni+2], ibg, oIng[ni+2], ni+2, gameIngType.INGREDIENT)}
          {this.renderIngredient(oUrl[ni+3], ibg, oIng[ni+3], ni+3, gameIngType.INGREDIENT)}
          {this.renderIngredient(oUrl[ni+4], ibg, oIng[ni+4], ni+4, gameIngType.INGREDIENT)}
          <Col xs md={1} className={"border d-flex flex-column justify-content-center"}>
            <button onClick={() => this.handleLR(gameIngType.INGREDIENT, true)}>Right</button>
          </Col>
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
              <h4 className="text-center">{finalScore}</h4>
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

