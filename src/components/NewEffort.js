import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import "./../css/Login.css"
import NewEffortTbl from './NewEffortTbl';
 var projects = [];

export default class NewEffort extends Component{
  constructor(props){
    super(props);
    
    this.state={
        projects:[],
        project:{},
        visibleIssues: false,
        visibleEffort : false,
        issue:{}
    }
       this.handleDataChange = this.handleDataChange.bind(this);
       this.handleIssueChange = this.handleIssueChange.bind(this);
   //    this.renderEffortTbl = this.renderEffortTbl.bind(this);
       this.getIssues = this.getIssues.bind(this);
       this.issueCombo = React.createRef();
    };
    
    componentDidMount(){
    axios.get('http://localhost:8080/projects')
    .then(res=>{
        let projects=res.data;
        this.setState({projects});
     
    })
    .catch((err) => {
            alert("Nece get");
            console.log("AXIOS ERROR: ", err);
        });
    
  }
  

  getProjTypes(projects){
        let list=[];
        projects.map((item)=>{
          list.push({value:item.projectId,
                            label:item.projectName});
    });
    return list;
  } 
  getIssues(project){
    let list=[];
    project.issues.map((item)=>{
        list.push({value:item.issueID,
                        label:item.issueName});
  });
    return list;
  }
  handleDataChange=(dName,dValue)=>{
        let project = this.state.projects.find(el => el.projectId === dValue.value);
        this.setState({
            project : project,
            visibleIssues : true})

    }

  handleIssueChange = (labelName,labelValue)=>{
    console.log('vrednost labele je'+labelValue.value.issueId)
      let issue = this.state.project.issues.find(el => el.issueID.issueId == labelValue.value.issueId); 
       this.state.issue = issue;
       console.log('issue je '+ this.state.issue.issueID.issueId)
       this.setState({visibleEffort:true})
  }
 renderTabelaIssues(){
     
     let proj = this.state.project;
     let issues = this.getIssues(this.state.project)

     return(
      // <NewEffortTbl ref={this.issueCombo} projects={proj}/>
      <p><Select
          placeholder="Choose issue"
          onChange={(value)=>this.handleIssueChange("issue",value)}
          options={issues}
      /></p>
     );
 }

 renderEffortTbl(){
     
  let proj = this.state.project;
 let issue = this.state.issue;
  return(
     <NewEffortTbl ref={this.effortTbl} issue={issue}/>
 
  );
}

    render(){
        let issueCombo;
        let effortTbl;
        projects=this.getProjTypes(this.state.projects);
        if(this.state.visibleIssues){
          issueCombo = this.renderTabelaIssues();
        }
        if(this.state.visibleEffort){
          effortTbl = this.renderEffortTbl();
        }
        if(this)
        return (
        <div className="login">
          <h2 className="login-header">New Effort</h2>
          <form className="login-container">
          <p><Select
            placeholder="Choose Project"
            onChange={(value)=>this.handleDataChange("handleDataChange",value)}
            options={projects}
            /></p>
          {issueCombo}
          {effortTbl}
      </form>
</div>
        );
    
    }
}
