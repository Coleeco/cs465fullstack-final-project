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
          items: []
        };
      }
    
      componentDidMount() {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result.drinks[0]);
              this.setState({
                isLoaded: true,
                items: result
              });
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
                    <Col xs md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={alcohol}/></Col>
                    <Col xs md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={alcohol}/></Col>
                    <Col xs md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={alcohol}/></Col>
                    <Col xs md={2} className="bg-primary border d-flex justify-content-center"><input id="gimg" onClick={handleClick} type="image" alt="Alcohol" src={alcohol}/></Col>
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
                   <input id="dimg" type="image" alt="DrinkToMake" src={items.drinks[0].strDrinkThumb}/>
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
