import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import Select from 'react-select';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import {format} from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';
import "./../css/Login.css"

 var types=[];

export default class NewProject extends Component{
  constructor(props){
    super(props);
    
    this.state={
        types:[{}],
        type:'',
        projectName:'',
        description:'',
        startDate:'',
        endDate:'',
        issueName:'',
        issueDescription:'',
        storyPoint:'',
        status:'',
        issues:[]
        
    }
       
    };
  

    submit=e=>{
        e.preventDefault();
        var headers = {
        'headers': {
            'Content-Type': 'application/json;charset=UTF-8'
        }
        }  
        console.log(this.state);
            var data = {

                    projectName:this.state.projectName,
                    description:this.state.description,
                    startDate:format(this.state.startDate,'yyyy-MM-dd'),
                    endDate:format(this.state.endDate,'yyyy-MM-dd'),
                    type:{ typeId:this.state.type.value},
                    issues: this.state.issues
             
             }
        
             
        axios.post('http://localhost:8080/projects/add', data, headers)
            .then((res) => {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Uspesno dodat novi projekat',
                showConfirmButton: false,
                timer: 1500
            })
      //      this.setState({gotovo:true});
        this.props.history.push({pathname:'/projects'});
            })
            .catch((err) => {
                Swal({
                    type:'error',
                    text:'Nisu dobro uneti podaci!'
                });
            });
    

    }
    change=e=>{
       // console.log(e.target.name);
         this.setState({
            [e.target.name]:e.target.value
            });
        }
        
        changeZadatak=e=>{
            let field = e.target.name;
            let value = e.target.value;
                console.log(field);
                console.log(value);
            if(field == 'issueName'){
                console.log(this.state.issue.issueName);
                this.state.issue.issueName = value;
               // console.log(this.state.zadatak.nazivZadatka);
                 }
         }
    
    componentDidMount(){
    axios.get('http://localhost:8080/projectType')
    .then(res=>{
        types=res.data;
        console.log(res.data);
        this.setState({types});
        console.log(types);
    })  
    }
        
  getProjectTypes(types){
        let list=[];
        types.map((item)=>{
            list.push({value:item.typeId,
                            label:item.typeName});
    });
    return list;
}


handleTimeChange=(timeName,timeValue)=>{
        console.log(timeValue);
        this.setState({
                [timeName]: timeValue
        });
    }


handleDateChange = (dateName, dateValue) => {
        if(dateValue<moment()){
            alert('Datum mora biti posle danasnjeg!');
            return;
            }
        this.setState({
                [dateName]: dateValue
        })
    }
dodaj=e=>{
        e.preventDefault();
        let issues = this.state.issues;
        let issue = {
            issueName : this.state.issueName,
            issueDescription : this.state.issueDescription,
            storyPoint : this.state.storyPoint,
            status : this.state.status
            
        }
        issues.push(issue);
        this.setState({
            issueName: '',
            issueDescription:'',
            storyPoint:'',
            status:''
        })
   
     console.log(this.state);
   
}
    render(){
         types=this.getProjectTypes(this.state.types);
        return (
          
        <div className="login">
          <h2 className="login-header">New Project</h2>
          <form className="login-container">
            <p><input 
            type="text"
            className="form-control"
            name="projectName"
            placeholder="Project Name"
            required=""
            autoFocus=""
            value={this.state.projectName}
            onChange={e=>this.change(e)}
            /></p>
            <p><input 
            type="text"
            className="form-control"
            name="description"
            placeholder="Project Description"
            required=""
            autoFocus=""
            value={this.state.description}
            onChange={e=>this.change(e)}
            /></p>
          
            <p>Start Date:    <DatePicker className="form-control"
            selected={this.state.startDate}
            onChange={(value)=>this.handleDateChange("startDate",value)}
            /></p>
            <p>End date: <DatePicker className="form-control"
            selected={this.state.endDate}
            onChange={(value)=>this.handleDateChange("endDate",value)}
            /></p>
           
            <p><Select
            placeholder="Project Type"
            onChange={(value)=>this.handleTimeChange("type",value)}
            options={types}
            /></p>
        <p><button 
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={e=>this.submit(e)}>Save</button>
        </p>

        <p><input 
            type="text"
            className="form-control"
            name="issueName"
            placeholder="Issue Name"
            required=""
            autoFocus=""
            value={this.state.issueName}
            onChange={e=>this.change(e)}
            /></p>
            <p><input 
            type="text"
            className="form-control"
            name="issueDescription"
            placeholder="Issue Description"
            required=""
            autoFocus=""
            value={this.state.issueDescription}
            onChange={e=>this.change(e)}
            /></p>
          <p><input 
            type="text"
            className="form-control"
            name="storyPoint"
            placeholder="Story Point"
            required=""
            autoFocus=""
            value={this.state.storyPoint}
            onChange={e=>this.change(e)}
            /></p>
          <p><input 
            type="text"
            className="form-control"
            name="status"
            placeholder="Status"
            required=""
            autoFocus=""
            value={this.state.status}
            onChange={e=>this.change(e)}
            /></p>
           <p><button 
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={e=>this.dodaj(e)}>Add Issue</button></p>  
      </form>
               

</div>
        );
    
    }
}
