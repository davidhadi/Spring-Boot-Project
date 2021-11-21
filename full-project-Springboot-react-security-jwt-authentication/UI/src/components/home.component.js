import React, { Component } from "react";

import UserService from "../services/user.service";
import img1 from '../images/desk.png';
import img2 from '../images/desk2.png';
import img3 from '../images/desk3.png';
import '../css/slider.css';
import '../css/home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <>
        <header className="jumbotron">
        <div>
          <div id="slider">
          <figure>
              <img src={img1} />
              <img src={img2} />
              <img src={img1} />
              <img src={img3} />
              <img src={img1} />
          </figure>
          </div>
          <div class="text_on_scr"><h1> AdNetworK </h1>
          <h6> this is the description place of website </h6>
          </div>
          </div>
          <section class="description">
            <div class="box_description">
                hii
            </div>
            <div class="box_description">
              hii
            </div>
          </section>
          <section class="description_buttom">
        hii
          </section>
          <h3>{this.state.content}</h3>
        </header>
        </>
      </React.Fragment>
    );
  }
}
