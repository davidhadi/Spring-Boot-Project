import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }
  
    componentDidMount() {
      UserService.getModeratorBoard().then(
        response => {
          this.setState({
            data: [response.data]
          });
        }
      ,
        error => {
          this.setState({
            content:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
   
        }
      );
    }
  
    render() {
      return (
        <div class="table_data">
          <table>
            <tr>
              <th>Serial No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          {
            this.state.data.map((dynamicData, Key) => {
              let keys = Object.keys(dynamicData);
              let d = dynamicData;
              return keys.map(data => {
                return (
                  <tr>
                      <td>{data}</td>
                      <td>{dynamicData[data].id}</td>
                      <td>{dynamicData[data].username}</td>
                      <td>{dynamicData[data].email}</td>
                  </tr>
                );
              });
            })
          }
          </table>
        </div>
      )
    }
  }
