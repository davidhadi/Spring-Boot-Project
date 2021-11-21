import React, {Component } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";

import UserService from "../services/user.service";
import Form from 'react-validation/build/form';
import Input from "react-validation/build/input";
import '../css/adminboard.css';
import EventBus from "../common/EventBus";

export default class BoardAdmin extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }
  
    componentDidMount() {
      UserService.getAdminBoard().then(
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
    deleteRow(id, e){  
      axios.delete("http://localhost:8080/api/test/delete", { headers: authHeader() ,params: {id: id}})  
        .then(response => {
          console.log(response);  
          console.log(response.data); 
          
          window.location.reload(false);
        
        }) 
    }  
    render() {
      const { user: currentUser } = this.props;
      return (
        <div class="table_data">
          <table>
            <tr>
              <th>Serial No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Process</th>
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
                      <td><button onClick={(e) => this.deleteRow(dynamicData[data].id, e)}>Delete</button></td>
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

