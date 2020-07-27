import React, {Component} from 'react'; //Import component from react for the class to extend from.
import { Grid, Row, Col } from 'react-flexbox-grid';
import glass from './glass.png'
import ingredient from './Ingredient.png'
export class Game extends Component {
    render(){
        return (
            <Grid fluid>
              <Row>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center"><input type="image" alt="Glass" src={glass}/></Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center"><input type="image" alt="Glass" src={glass}/></Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center"><input type="image" alt="Glass" src={glass}/></Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center"><input type="image" alt="Glass" src={glass}/></Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center"><input type="image" alt="Glass" src={glass}/></Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center"><input type="image" alt="Glass" src={glass}/></Col>
              </Row>
              <Row>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
              </Row>
              <Row>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
              </Row>
              <Row>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
              </Row>
              <Row>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center"><input type="image" alt="Ingredient" src={ingredient}/></Col>
              </Row>
            </Grid>
          );
    }

}
