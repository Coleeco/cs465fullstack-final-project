import React, {Component} from 'react'; //Import component from react for the class to extend from.
import { Grid, Row, Col } from 'react-flexbox-grid';
import glass from './glass.png'
import ingredient from './Ingredient.png'
import alcohol from './Alcohol.png'
import goal from './Goal.png'
import { postRequest, getRequest } from "../ApiCaller";

const gameIngType = {
    GLASS: 'glass',
    ALCOHOL: 'alcohol',
    INGREDIENT: 'ingredient',
    SELECTALC: 'selalc',
    SELECTING: 'seling',
}

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

      gBGc: "bg-success",
      aBGc: "bg-primary",
      iBGc: "bg-info",
      wBGc: "bg-warning",
      dBGc: "bg-danger",

      keys: ["1","2","3","4","5","6","7","8"],

      glassNames: ["glass type"],
      abg: ["bg-primary"],
      ibg: ["bg-info"],
      gbg: ["bg-success"],

      hardmode: ""
    };
  };

  resetGame(){
    this.setState({
      isLoaded: false,
      submit: false,

      finalScore: 0,
      
      goalAlcIng: [], 
      goalNonIng: [], 
      aIng: [], 
      oIng: [],
      
      extras: [], 
      items: [{strDrinkThumb: goal, strDrink: "Cocktail"}], 

      preIng: "https://www.thecocktaildb.com/images/ingredients/", 
      affIng: "-Small.png", 
      
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

      gBGc: "bg-success",
      aBGc: "bg-primary",
      iBGc: "bg-info",
      wBGc: "bg-warning",
      dBGc: "bg-danger",

      keys: ["1","2","3","4","5","6","7","8"],

      glassNames: ["glass type"],
      abg: ["bg-primary"],
      ibg: ["bg-info"],
      gbg: ["bg-success"],

      hardmode: ""
    });

    this.componentDidMount();
  }

  renderLoadingPiece(data){
    const {gbg, abg, ibg, keys} = this.state

    switch(data){
      default:
        console.log("ENUM not set for renderGamePiece(edata)");
        break;
      case gameIngType.INGREDIENT:        
          return(
          keys.map((key) => (
            <span key={key} className="container">
              <img id="gimg" className= {ibg[0] + " border-1 m-3"} type="image" alt="ingredient" src={ingredient}/>
              <p className="text-block">Ingredient</p>
            </span>
              
          ))
        );  
      case gameIngType.ALCOHOL:
        return(
          keys.map((key) => (
            <span key={key} className="container">
              <img id="gimg" className= {abg[0] + " border-1 m-3"} type="image" alt="alcohol" src={alcohol}/>
              <p className="text-block">Alcohol</p>
            </span>
              
          ))
        );  
      case gameIngType.GLASS:
        return(
          keys.map((key) => (
            <span key={key} className="container">
              <img id="gimg" className= {gbg[0] + " border-1 m-3"} type="image" alt="glass"src={glass}/>
              <p className="text-block">Glass</p>
            </span>
              
          ))
        );      
    }
  };
  
  renderGamePiece(data){
    const {aIng,oIng, glassNames, preIng, affIng, gbg, abg, ibg} = this.state

    switch(data){
      default:
        console.log("ENUM not set for renderGamePiece(data)");
        break;
      case gameIngType.INGREDIENT:        
          return(
          oIng.map((non, i) => (
            <span key={non} className="container">
              <img id="gimg" onClick={() => this.handleClick(i, data)} onMouseOver={() => this.handleMouseOver(i, data)}  onMouseLeave={() => this.handleMouseLeave(i, data)} className= {ibg[i] + " border-1 m-3"} type="image" alt={non}src={preIng+ non + affIng}/>
              <p className="text-block">{non.substring(0, Math.min(non.length, 16))}</p>
            </span>
              
          ))
        );  
      case gameIngType.ALCOHOL:
        return(
          aIng.map((alc, i) => (
            <span key={alc} className="container">
              <img id="gimg" onClick={() => this.handleClick(i, data)} onMouseOver={() => this.handleMouseOver(i, data)}  onMouseLeave={() => this.handleMouseLeave(i, data)} className= {abg[i] + " border-1 m-3"} type="image" alt={alc}src={preIng+ alc + affIng}/>
              <p className="text-block">{alc.substring(0, Math.min(alc.length, 16))}</p>
            </span>
              
          ))
        );  
      case gameIngType.GLASS:
        return(
          glassNames.map((gname, i) => (
            <span key={gname} className="container">
              <img id="gimg" onClick={() => this.handleClick(i, data)} onMouseOver={() => this.handleMouseOver(i, data)}  onMouseLeave={() => this.handleMouseLeave(i, data)} className= {gbg[i] + " border-1 m-3"} type="image" alt={gname}src={glass}/>
              <p className="text-block">{gname.substring(0, Math.min(gname.length, 16))}</p>
            </span>
              
          ))
        );      
    }
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

  renderHardmode(){
    if (this.props.hardmode)
    {
      return(
        <div className = "d-flex justify-content-center">
          <button onClick = {() => this.handleHMClick(this.props.hmclick)} className="bg-danger">Hardmode <h6>On</h6></button>
        </div>
      );
    }
    else{
      return(
        <div className = "d-flex justify-content-center">
          <button onClick = {() => this.handleHMClick(this.props.hmclick)} className="bg-success">Hardmode <h6>Off</h6></button>
        </div>
      );
    }
  }

  renderHMLoad(){
    if (this.props.hardmode)
    {
      return(
        <div className = "d-flex justify-content-center">
          <button className="bg-danger">Hardmode <h6>On</h6></button>
        </div>
      );
    }
    else{
      return(
        <div className = "d-flex justify-content-center">
          <button className="bg-success">Hardmode <h6>Off</h6></button>
        </div>
      );
    }
  }

  handleHMClick(func){
    func();
    this.resetGame();
    return;
  }

  handleMouseOver(i, data){
    const {gbg, abg, ibg} = this.state
    var temp = [];

    switch(data){
      default:
        console.log("ENUM not set for ingredient handleMouseOver(i, data) function call");
        break;
      case gameIngType.INGREDIENT: 
        temp = ibg;
        temp[i] = "bg-secondary"
        this.setState({
          ibg: temp
        })
        break;
      case gameIngType.ALCOHOL:
        temp = abg;
        temp[i] = "bg-secondary"
        this.setState({
          abg: temp
        })
        break;
      case gameIngType.GLASS:
        temp =gbg;
        temp[i] = "bg-secondary"
        this.setState({
          gbg: temp
        })
        break;
      }

    return;
  };

    handleMouseLeave(i, data){
    const {gbg, abg, ibg, selectedIngredients, selectedAlcohols, selectedGlass} = this.state
    var temp =[];

    switch(data){
      default:
        console.log("ENUM not set for ingredient handleMouseOver(i, data) function call");
        break;
      case gameIngType.INGREDIENT: 
        temp = ibg;
        if(selectedIngredients.includes(i)){
          temp[i] = "bg-warning"
        }
        else{
          temp[i] = "bg-info"
        }
        this.setState({
          ibg: temp
        })
        break;
      case gameIngType.ALCOHOL:
        temp = abg;
        if(selectedAlcohols.includes(i)){
          temp[i] = "bg-warning"
        }
        else{
          temp[i] = "bg-primary"
        }
        this.setState({
          abg: temp
        })
        break;
      case gameIngType.GLASS:
        temp = gbg;
        if(selectedGlass === i)
        {
          temp[i] = "bg-warning"
        }
        else{
          temp[i] = "bg-success"
        }
        break;
    }

    return;
  };

  handleClick(i, ptype){    
    if(!this.state.isLoaded)
    {
      return;
    }
    var atemp = this.state.abg;
    var itemp = this.state.ibg;
    var gtemp = this.state.gbg;
    
    if(this.props.hardmode)
    {
      switch(ptype){
        default:
          console.log("ERROR in handleClick(i, ptype) enum not set")
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
            ibg: itemp,
          });
          break;
      }
    }
    else{
      switch(ptype){
        default:
          console.log("ERROR in handleClick(i, ptype) enum not set")
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
            if(this.state.selectedAlcohols.length >= this.state.goalAlcIng.length){
              let temp = this.state.selectedAlcohols.shift();
              atemp[temp] = "bg-primary";
            }
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
            if(this.state.selectedIngredients.length >= this.state.goalNonIng.length){
              let temp = this.state.selectedIngredients.shift();
              itemp[temp] = "bg-info";
            }
            itemp[i] = "bg-warning"
            this.state.selectedIngredients.push(i);
          }
          this.setState({
            ibg: itemp,
          });
          break;
      }
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
            if(result.ingredients){
              if(result.ingredients[0].strAlcohol!=null && !this.state.aIng.includes(result.ingredients[0].strIngredient)) {
                this.state.aIng.push(result.ingredients[0].strIngredient);
                this.state.abg.push(this.state.aBGc);
                if(goal)
                  this.state.goalAlcIng.push(result.ingredients[0].strIngredient);
              }
              else if (!this.state.oIng.includes(result.ingredients[0].strIngredient) && result.ingredients[0].strAlcohol == null){
                this.state.oIng.push(result.ingredients[0].strIngredient);
                this.state.ibg.push(this.state.iBGc);
                if(goal)
                  this.state.goalNonIng.push(result.ingredients[0].strIngredient);
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
    
    this.state.glassNames.shift();

    let goalGlass = this.state.glassNames.shift();
    this.state.glassNames.splice(Math.floor(Math.random() * (this.state.glassNames.length-1)),0, goalGlass);
    
    for(let i = 0; i < this.state.goalAlcIng.length; ++i )
    {
      let goalAlc = this.state.aIng.shift();
      this.state.aIng.splice(Math.floor(Math.random() * (this.state.aIng.length-1)),0, goalAlc);
    };

    for(let i = 0; i < this.state.goalNonIng.length; ++i )
    {
      let goalIng = this.state.oIng.shift();
      this.state.oIng.splice(Math.floor(Math.random() * (this.state.oIng.length-1)),0, goalIng);
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

    if(this.props.hardmode){
      score = Math.max(((100.0 * total) - ((100.0 * total) * (aerror + nerror + gerror)/total)), 0);
    }
    else{
      score = Number((Math.max(100.0 - ((100.0 * (aerror + nerror + gerror)/total)), 0)).toFixed(0));
    }

    this.setState({
      finalScore: score,
      submit: true,
      glassError: gerror,
      alcError: aerror,
      nonError: nerror,
      correctSelAlc: correctAlc,
      incorrectSelAlc: incorrectAlc,
      correctSelNon: correctIng,
      incorrectSelNon: incorrectIng
    })

    if(this.props.userinfo.loginname !== ""){
      const UpdateInfo = {
        loginname: this.props.userinfo.loginname,
        score: this.props.userinfo.score + score
      };

      var usertemp = this.props.userinfo;
      usertemp.score = UpdateInfo.score;

      postRequest("/user/setscore", UpdateInfo)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw "User not found";
          }
        })
        .catch((error) => {
          console.log(error);
        });

      getRequest("/titles")
        .then(res => res.json())
        .then(
            (result) => {
              console.log(result);
              let mytitle = result[0].name;
              for (const title in result){
                if(UpdateInfo.score > title.minscore){
                  mytitle = title.name;
                }
                else{
                  break;
                }
              }
              usertemp.title = mytitle;
              console.log(mytitle);
              console.log(usertemp);
              this.props.refreshScore(usertemp);
            },
            (error) => {
              console.log(error);
            }
        )

      
    }
  };

  handleAgain(){
    this.resetGame();
  }

  render() {
    const { error, submit, items, isLoaded, glassNames, finalScore} = this.state;
    if(error)
    {
      console.log(error);
      return(
        <div>An error occured trying to access the cocktailDB API</div>
      )
    }
    else if(!isLoaded)
    {
      return(
        <div>
          {this.renderHMLoad()}                         
        <Grid fluid>
          <Row>          
            <div className="scroll">
              {this.renderLoadingPiece(gameIngType.GLASS)}                         
            </div>
          </Row>
          <Row>
            <div className="scroll">
              {this.renderLoadingPiece(gameIngType.ALCOHOL)}                         
            </div>          
          </Row>
          <Row>
            <div className="scroll">
              {this.renderLoadingPiece(gameIngType.INGREDIENT)}                         
            </div>          
          </Row>
          <Row>
            <Col xs md={4}>
              <h4 className="mt-4 pl-4">Select from the ingredients listed above to make the drink shown here.  </h4>
            </Col>
            <Col xs md={4}>
              <div className="mt-4 d-flex justify-content-center">
                <input id="dimg" className="border-1 border-dark" type="image" alt="DrinkToMake" src={goal}/>
                </div>
              <h3 className="text-center">Drink To Make</h3>
            </Col>
            <Col>
              <button className="mt-4"> Submit </button>
            </Col>
          </Row>
          
        </Grid>
        </div>
      );
    }
    else if(!submit && isLoaded) {
      return(
        <div>
          {this.renderHardmode()}                         
        <Grid fluid>
          <Row>          
            <div className="scroll">
              {this.renderGamePiece(gameIngType.GLASS)}                         
            </div>
          </Row>
          <Row>
            <div className="scroll">
              {this.renderGamePiece(gameIngType.ALCOHOL)}                         
            </div>          
          </Row>
          <Row>
            <div className="scroll">
              {this.renderGamePiece(gameIngType.INGREDIENT)}                         
            </div>          
          </Row>
          <Row>
            <Col xs md={4}>
              <h4 className="mt-4 pl-4">Select from the ingredients listed above to make the drink shown here.  </h4>
            </Col>
            <Col xs md={4}>
              <div className="mt-4 d-flex justify-content-center">
                <input id="dimg" className="border-1 border-dark" type="image" alt="DrinkToMake" src={items[0].strDrinkThumb}/>
                </div>
              <h3 className="text-center">{items[0].strDrink}</h3>
            </Col>
            <Col>
              <button className="mt-4" onClick={() => this.handleSubmit()}> Submit </button>
            </Col>
          </Row>
          
        </Grid>
        </div>
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

