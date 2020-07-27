import React, {Component} from 'react'; //Import component from react for the class to extend from.
import { Grid, Row, Col } from 'react-flexbox-grid';


export class Game extends Component {
    render(){
        return (
            <Grid fluid>
              <Row>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center">GlassType</Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center">GlassType</Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center">GlassType</Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center">GlassType</Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center">GlassType</Col>
                <Col xs={1} md={2} className="bg-success border d-flex justify-content-center">GlassType</Col>
              </Row>
              <Row>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
              </Row>
              <Row>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
              </Row>
              <Row>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
              </Row>
              <Row>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
                <Col xs={1} md={2} className="bg-primary border d-flex justify-content-center">IngredientType</Col>
              </Row>
            </Grid>
          );
    }

}
