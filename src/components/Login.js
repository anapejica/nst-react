import React, { Component } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { withRouter } from "react-router";
import {useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
import "./../css/Login.css"


class Login extends Component {

    state={
        username:'',
        password:'',
        loggedUser:{}
    }

    change=e=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    goToHomePage(){
        localStorage.setItem("name",this.state.loggedUser.name);
        localStorage.setItem("managerId",this.state.loggedUser.managerId);
        console.log(this.props);

        this.props.history.push("/adminmain");
        
        window.location.reload(); 

    }

    
    submit=e=>{
        e.preventDefault();
      
        if(isNaN(this.state.username) || isNaN(this.state.password)){
            var headers = {
                'headers': {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
   
           

            var data = {
                "username": this.state.username,
                "password": this.state.password
            }
            console.log(headers)
            axios.post('http://localhost:8080/login', data, headers)

            .then((res) => {
        
            const Confirmation = Swal.mixin({
                  position: 'center',
                  timer: 1500,
                  showConfirmButton: false,
                 })
            Confirmation.fire('Uspesno ste se ulogovali', '', 'success');
            console.log('rezultat je'+res.data);
             let loggedUser = res.data;
             this.setState({loggedUser}, this.goToHomePage);
                
            })
            .catch((err) => {
               Swal.fire(err.response.data, '', 'error');
            });
        } else { 
            Swal.fire('Fields can not be empty', '', 'error');
        }
    }
  render() {

    return (
     <div className="login">
        <div className="login-triangle"></div>
        <h2 className="login-header">Unesite podatke</h2>
        <form className="login-container">
            <p><input 
            type="text"
            className="form-control"
            name="username"
            placeholder="Username"
            required={true}
            autoFocus=""
            value={this.state.username}
            onChange={e=>this.change(e)}
            /></p>
            <p><input 
            name="password"
            className="form-control"
            type="password"
            placeholder="Password"
            required={true}
            value={this.state.password}
            onChange={e=>this.change(e)}
            /></p>
            <p><button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={e=>this.submit(e)}>Uloguj se</button></p>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);