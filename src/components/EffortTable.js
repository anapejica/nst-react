import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import "./../css/Prikaz.css"



export default class EffortTable extends Component{
    
  constructor(props){
      console.log('props are' +props); 
        super(props);
        this.state={
            efforts:props.efforts.map(el=>{el.name=el.developer.dev;
                                       return el;})
            
        }
       }
componentDidMount(){
    
        let ucinci='';
      
    
  }
       componentWillReceiveProps(props){
        this.setState({
                efforts:props.efforts
            })
    }   
    
render(){
     
        return(
            <div>
            <h3 align='center'>Ucinci</h3>
              <BootstrapTable data={this.state.efforts}>
                <TableHeaderColumn dataField='ucinakID' isKey hiden></TableHeaderColumn>
                <TableHeaderColumn width ={'33%'} dataField='name'>Employee</TableHeaderColumn>
                <TableHeaderColumn width ={'33%'} dataField='hours'>Hours</TableHeaderColumn>
                <TableHeaderColumn width ={'33%'} dataField='description'>Description</TableHeaderColumn>
               
            </BootstrapTable>
          
            </div>
           
            
           
        );
    }
}