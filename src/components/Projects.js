import React, { Component } from 'react';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import moment from 'moment';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import "./../css/Prikaz.css"
import TabelIssues from './TabelIssues';

function dateFormatter(cell: any) {
    if (!cell) {
          return "";
    }
    return `${moment(cell).format("DD-MM-YYYY")? moment(cell).format("DD-MM-YYYY"):moment(cell).format("DD-MM-YYYY") }`;
}


export default class Projects extends Component{
  constructor(props){
        super(props);

        this.state={
            projects:[],
            //izabraniRed:null,
            isHidden:true,
            issues:[],
            isHid:''
          
        };

        this.onRowSelect=this.onRowSelect.bind(this);
        this.renderTabel=this.renderTabel.bind(this);
        this.tabelIssues = React.createRef();
    }
    componentDidMount(){
        axios.get('http://localhost:8080/projects')
        .then(res=>{
           
            let projects=res.data.map(el=>{el.type=el.type.typeName;return el;});
            this.setState({projects});
            console.log(projects)
        })
        .catch((err) => {
                alert("Nece get");
                console.log("AXIOS ERROR: ", err);
            });
    }



    componentWillUnmount() {
        document.removeEventListener("click", this.closeMenu, true);
    }
  

    promeniStatus(status){
        this.setState({
        isHidden: {status}
        });
    }

    onRowSelect(row, isSelected,e){
        e.preventDefault();
        this.setState({isHidden:false, issues : row.issues});
        console.log(this.state.issues);
    
    }

    renderTabel(){
        
        console.log(this.state.issues);
        let z = this.state.issues;
        return(
        <TabelIssues ref={this.tabelIssues} issues={z}/>
        );
    }
    AddNewProject(e){
        e.preventDefault();
        this.props.history.push({pathname:'/newproject'});
    }
    render(){
        var selectRowProp = {
                mode: 'radio',
                clickToSelect: true,
                onSelect: this.onRowSelect,
                bgColor: '#fce3c2',
                hideSelectColumn: true
            };
        let tabelIssues;
        var hidden={display:this.state.isHid ? 'true' : ''};
        if(!this.state.isHidden){
            tabelIssues = this.renderTabel();
        }
        return(
            <div>
            <h1 align='center'>Manage Projects</h1>
            <div className="container" style={{marginTop:50}}>
            <BootstrapTable data={this.state.projects} selectRow={selectRowProp} hover striped pagination>
                <TableHeaderColumn dataField='projectId' isKey hidden></TableHeaderColumn>
                <TableHeaderColumn width ={'20%'} dataField='projectName'>Project Name</TableHeaderColumn>
                <TableHeaderColumn width ={'20%'} dataField='description'>Project Description</TableHeaderColumn>
                <TableHeaderColumn width ={'20%'} dataField='startDate' dataFormat={dateFormatter}>Start Date</TableHeaderColumn>
                <TableHeaderColumn width ={'20%'} dataField='endDate' dataFormat={dateFormatter}>End Date</TableHeaderColumn>
                <TableHeaderColumn width ={'20%'} dataField='type'>Type</TableHeaderColumn>
            </BootstrapTable>
                 <button disabled={hidden.display} onClick={(e)=>{this.AddNewProject(e)}}>Add New Project</button>

         
            {tabelIssues}

            </div>
           </div>
        );
    }
}
