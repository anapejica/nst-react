import React, { Component } from 'react';

import axios from 'axios';

import Swal from 'sweetalert2';

import 'react-datepicker/dist/react-datepicker.css';
import "./../css/Login.css"

 

export default class Employee extends Component{
  constructor(props){
    super(props);
    this.state={
        employeeId : props.location.data ? props.location.data.employeeId: '',
        employeeName : props.location.data ? props.location.data.employeeName: '',
        role : props.location.data ? props.location.data.role: '',
        manager: { managerId : localStorage.getItem("managerId")},
        new: !props.location.data
    }
       
    };
  


    submit=e=>{
        e.preventDefault();
        const Confirmation = Swal.mixin({
            position: 'center',
            timer: 1500,
            showConfirmButton: false,
           })
        var headers = {
            'headers': {
                'Content-Type': 'application/json;charset=UTF-8'
            }
         }
        var data = this.state;
        console.log(data)
        let path = 'http://localhost:8080/employees/employee';  
        axios.post(path, data, {headers:{id:this.state.employeeId}})
            .then((res) => {
                Confirmation.fire(res.data, '', 'success');            
                this.setState({gotovo:true});
                this.props.history.push({pathname:'/employees'});
            })
            .catch((err) => {
                Swal.fire("Error save", '', 'error');
            });
    }
    
    change=e=>{
      this.setState({
         [e.target.name]:e.target.value
      });
    }

    render(){
        return (
        <div className="login">
          <h2 className="login-header">Enter employee data:</h2>
          <form className="login-container">
            <p><input 
            type="text"
            className="form-control"
            name="employeeName"
            placeholder="Employee name"
            required=""
            autoFocus=""
            value={this.state.employeeName}
            onChange={e=>this.change(e)}
            /></p>
            <p><input 
            type="text"
            className="form-control"
            name="role"
            placeholder="Role"
            required=""
            autoFocus=""
            value={this.state.role}
            onChange={e=>this.change(e)}
            /></p>
            <p><button 
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={e=>this.submit(e)}>Save</button></p>
      </form>
              <button 
                 className="btn btn-lg btn-primary btn-block"
                 type="submit"
                 onClick={e=>this.props.history.push("/employees")}>Back to Employee page</button>
      </div>
       
        );

    
    }
}
