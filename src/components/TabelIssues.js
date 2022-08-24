import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import "./../css/Prikaz.css";
import EffortTable from './EffortTable';



export default class TabelIssues extends Component{
    
    constructor(props){
        console.log(props);
            super(props);
            this.state={
                issues:props.issues,
                efforts:[],
                isHidden:true,
            }
        this.onRowSelect=this.onRowSelect.bind(this);
        this.renderTable=this.renderTable.bind(this);
        this.effortTable = React.createRef();
    }

    componentWillReceiveProps(props){
        this.setState({
                issues:props.issues
            })
    }   
    componentWillUnmount() {
        document.removeEventListener("click", this.closeMenu, true);
    }
onRowSelect(row, isSelected,e){
        e.preventDefault();
        this.setState({isHidden:false, efforts : row.efforts});     
    }   
    
    renderTable(){
     let u = this.state.efforts;
     return(
       <EffortTable ref={this.effortTable} efforts={u}/>
     );
 }

render(){
    var selectRowProp = {
                mode: 'radio',
                clickToSelect: true,
                onSelect: this.onRowSelect,
                bgColor: '#fce3c2',
                hideSelectColumn: true
            };
        let effortTable;
 
        if(!this.state.isHidden){
            effortTable = this.renderTable();
        }
        return(
            <div>
            <h3 align='center'>Issues</h3>
              <BootstrapTable data={this.state.issues} selectRow={selectRowProp} hover striped pagination>
                <TableHeaderColumn dataField='issueId' isKey hidden></TableHeaderColumn>
                <TableHeaderColumn width ={'25%'} dataField='issueName'>Name</TableHeaderColumn>
                <TableHeaderColumn width ={'25%'} dataField='issueDescription'>Description</TableHeaderColumn>
                <TableHeaderColumn width ={'25%'} dataField='status'>Status</TableHeaderColumn>
                <TableHeaderColumn width ={'25%'} dataField='storyPoint'>Story point</TableHeaderColumn>
               
            </BootstrapTable>
         {effortTable}
            </div>
           
            
           
        );
    }
}