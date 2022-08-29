import React, { Component } from 'react';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import "./../css/Prikaz.css";
import Swal from 'sweetalert2';


export const Delete = () => {
  
    return Swal.fire({ 
        title: "Are you sure you want to delete employee?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: false
    }).then((result) => {
      return result.isConfirmed;
    });
  };

export default class Employees extends Component{
  constructor(props){
        super(props);

        this.state={
            employees:[],
            selectedRow:null,
            managerId: localStorage.getItem("managerId")
        };
      this.onRowSelect=this.onRowSelect.bind(this);
    }
    
    async deleteEmployee(e){
        e.preventDefault();
        let del = await Delete();
       
        if(del){
            let id=this.state.selectedRow;      
            axios.delete('http://localhost:8080/employees/delete', {headers:{id:id}})
                .then(res=>{
                    Swal.fire('Employee successfully deleted');
                    window.location.reload();
                })
                .catch(function(error){
                    Swal.fire(error.response.data);
                })

        }
      
      
    }       
     onRowSelect(row, isSelected,e){
        for(const prop in row){
            if(prop==='employeeId'){
               if(isSelected){
                this.state.selectedRow=row[prop];
                this.state.isHidden=false;
               }else{
                this.setState({selectedRow:null,isHidden:true});
               }
            }
        }
    }
    
    updateEmployee(e){
        e.preventDefault();
        let employeeId=this.state.selectedRow;
        localStorage.setItem("empl", employeeId);
     //   this.props.history.push({pathname:'/employee'});
    console.log(this.state.employees.find(choosen=>choosen.employeeId===this.state.selectedRow)); this.props.history.push({pathname:'/employee',data:this.state.employees.find(choosen=>choosen.employeeId===this.state.selectedRow)});

      
    }
    addNewEmployee(e){
        e.preventDefault();
        this.props.history.push({pathname:'/employee'});
    }
    componentDidMount(){
            let id = this.state.managerId;
            console.log('manager id je '+id);
            axios.get('http://localhost:8080/employees', {headers:{id:id}})
              .then(res=>{
            const employees=res.data;
            this.setState({employees});
           console.log(this.state.employees);
        })
        .catch((err) => {
                alert("Nece get");
                console.log("AXIOS ERROR: ", err);
            });
  }

 
    render(){
        var selectRowProp = {
                mode: 'radio',
                clickToSelect: true,
                onSelect: this.onRowSelect,
                bgColor: '#fce3c2',
                hideSelectColumn: true
            };

        var hidden={display:this.state.isHidden ? 'true' : ''};
       
        return(
            <div>
            <h1 align='center'>Manage employees</h1>
            <div className="container" style={{marginTop:50}}>
            <BootstrapTable data={this.state.employees} selectRow={selectRowProp} hover striped pagination>
                <TableHeaderColumn dataField='employeeId' isKey hidden></TableHeaderColumn>
                <TableHeaderColumn width = {'50%'} dataField='employeeName'>Name</TableHeaderColumn>
                <TableHeaderColumn width = {'50%'} dataField='role'>Role</TableHeaderColumn>
               
            </BootstrapTable>
         
          <button disabled={hidden.display} onClick={(e)=>{this.addNewEmployee(e)}} style={{marginRight:10}}>Add</button>
             <button disabled={hidden.display}  onClick={(e)=>{this.deleteEmployee(e)}} style={{marginRight:10}}>Delete</button>
             <button disabled={hidden.display}  onClick={e=>this.updateEmployee(e)} >Update</button>
             <button disabled={hidden.display}  onClick={e=>this.props.history.push("/adminmain")} style={{float:'right'}}>Back to Home page</button>
            </div>
        
            </div>
           
         );
         
       }
}
