import React from "react";
import ReactDOM from "react-dom";

class StudentScoreTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      genderFilter:0,
      nameFilter:'',
      data:_score,
      modifyScore:null
    };
  }

  onGenderChange(gender){
    this.setState({genderFilter:gender});
  }

  onNameChange(name){
    this.setState({nameFilter:name});
  }

  onModify(id){
    this.state.data.find(function(val){
      if(val._id == id){
        this.setState({modifyScore: val});
        return true;
      }
    }.bind(this));
  }

  onDelete(id){
    const data = this.state.data.map(function(item){
      if(item._id === id){
        item.deleteFlag = true;
      }
      return item;
    });
    this.setState({data: data});
  }

  saveHandler(newScore){
    const data = this.state.data.map(function(val){
      if(val._id == newScore.id){
        for(var i in val){
          val[i] = newScore[i];
        }
      }
      return val;
    });
    this.setState({data: data});
  }
}

class ModifyScore extends React.Component{

}

class NameFilter extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  nameChangeHandler(name){
    this.props.onNameChange(this.refs.nameFilter.value);
  }

  render(){
    return(
      <div className="condition-item">
        <label>
        <span>Search by Name: </span>
        <input onNameChange={this.nameChangeHandler} ref="nameFilter"/>
        </label>
      </div>
    );
  }
}

class GenderFilter extends React.Component{
  genderChangeHandler(){
    this.props.onGenderChange(this.refs.genderFilter.value);
  }

  render(){
    return(
      <div className="condition-item">
      <label>
      <span>Gender Options: </span>
      <select onChange={this.genderChangeHandler} ref="genderFilter">
        <option value="0">All</option>
        <option value="1">Male</option>
        <option value="2">Female</option>
      </select>
      </label>
      </div>
    )
  }
}

class ScoreTable extends React.Component{
  render(){
    return(
      <h1>It Workingajsdklfjaklsdj!</h1>
    );
  }
}

class ScoreItem extends React.Component{}

ReactDOM.render(<GenderFilter />, document.getElementById('content'));
