import React, { Component } from "react"; //Import component from react for the class to extend from.
import { Redirect } from "react-router";
import { postRequest } from "../ApiCaller";

export class Login extends Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="card mx-auto">
              <div className="card-body">
                <h1
                  className="card-title"
                  style={{ borderBottom: "1px solid #efefef" }}
                >
                  Cocktail Bar Backdoor
                </h1>
                <Form myProp={this.props.myProp} login={this.props.login} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      user: {},
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault(event);
    // console.log(this.props.myProp);
    // this.props.login('fucking finally!');
    const loginInfo = {
      loginname: this.state.username,
      password: this.state.password,
    };
    console.log(loginInfo);
    // postRequest("/user/login", loginInfo)
    //   .then((resp) => {
    //     if(resp.ok){
    //       return resp.json();
    //     }
    //   })
    //   .then(data => console.log(data))
    //   .catch((error) => console.log(error));

    postRequest("/user/login", loginInfo)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          this.clearForm();
          throw new Error("no user logged on");
        }
      })
      .then((data) => {
        console.log(typeof data);
        let user = data[0];
        console.log(user);
        this.props.login(user);
      })
      .catch((error) => console.log(error));
  }

  clearForm() {
    this.setState({
      username: "",
      password: "",
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <form
        className="needs-validation"
        noValidate
        onSubmit={this.handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="usesrname"
            required
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            required
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary float-right"
          onClick={this.clearForm}
        >
          Cancel
        </button>
      </form>
    );
  }
}
