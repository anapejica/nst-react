import React, { Component } from 'react';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import Select from 'react-select';
import Swal from 'sweetalert2';
import "./../css/Prikaz.css";

var employees = [];

export default class NewEffortTbl extends Component{
    
  constructor(props){
      console.log(props);
        super(props);
        this.state={
            issue:props.issue,
            employees:[],
            employee:'',
            description: '',
            hours: ''
        }
       this.handleEmployeeChange = this.handleEmployeeChange.bind(this);

       }
 componentDidMount(){
        let id = localStorage.getItem("managerId");
        axios.get('http://localhost:8080/employees', {headers:{id:id}})
       .then(res=>{
        const employees=res.data;
        this.setState({employees});
    })
    .catch((err) => {
            alert("Nece get");
            console.log("AXIOS ERROR: ", err);
        });
    
  }

componentWillReceiveProps(props){
    this.setState({
            issue:props.issue
        })
}   
    
    change=e=>{
    this.setState({
        [e.target.name]:e.target.value
    });
}
 
 getEmployees(employees){
        let list=[];
        employees.map((item)=>{
            list.push({value:item.employeeId,
                            label:item.employeeName});
    });
    return list;
}
handleEmployeeChange = (labelName,labelValue)=>{
   let employee = this.state.employees.find(el => el.employeeId === labelValue.value); 
    this.state.employee = employee;
   this.setState({employee : employee})   
   console.log(this.state.employee)
 }

   submit=e=>{
        e.preventDefault();
        var headers = {
        'headers': {
            'Content-Type': 'application/json;charset=UTF-8'
        }
        }
            
             var data = {
                 description: this.state.description,
                 hours: this.state.hours,
                 employee: {employeeId: this.state.employee.employeeId}             
    }
    let issueId = this.state.issue.issueID.issueId;
    let projectId = this.state.issue.issueID.projectId;
    axios.post('http://localhost:8080/projects/effort', data,{headers:{projectId:projectId,issueId:issueId}})

        .then((res) => {
            Swal.fire(res.data,'','success');
           
        })
        .catch((err) => {
            Swal.fire("Error while saving effort",'','error');
        });
   

        }   
render(){
       employees=this.getEmployees(this.state.employees);
  return(
   <div>
      <p><Select
            placeholder="Choose employee"
            onChange={(value)=>this.handleEmployeeChange("employee",value)}
            options={employees}
       /></p>
        <p><input 
            type="text"
            className="form-control"
            name="description"
            placeholder="Effort Description"
            required=""
            autoFocus=""
            value={this.state.description}
            onChange={e=>this.change(e)} />
       </p>
    <p><input 
            type="text"
            className="form-control"
            name="hours"
            placeholder="Hours"
            required=""
            autoFocus=""
            value={this.state.hours}
            onChange={e=>this.change(e)} />
       </p>
<p><button 
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={e=>this.submit(e)}>Save effort</button>
        </p>

           </div>
        );
    }
}