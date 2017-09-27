import React from "react";
import ReactDOM from "react-dom";

const _score=[
  {name:"Frank",gender:"Male",maths:88,english:88,_id:1 },
  {name:"Frank",gender:"Female",maths:90,english:85,_id:2 },
  {name:"Peter",gender:"Male",maths:77,english:95,_id:3 },
  {name:"Peter",gender:"Female",maths:80,english:99,_id:4 },
  {name:"Jesse",gender:"Male",maths:89,english:90,_id:5 },
  {name:"Jesse",gender:"Female",maths:87,english:91,_id:6 }
];

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
      if(val._id == newScore._id){
        for(var i in val){
          val[i] = newScore[i];
        }
      }
      return val;
    });
    this.setState({data: data});
        console.log(this);
  }

  render(){
    if(!this.state.data){
      return <div>loading...</div>
    }else{
      return(
        <div>
          <GenderFilter onGenderChange={this.onGenderChange.bind(this)} genderFilter={this.state.genderFilter}/>
          <NameFilter onNameChange={this.onNameChange.bind(this)} nameFilter={this.state.nameFilter}/>
          <ModifyScore val={this.state.modifyScore} save={this.saveHandler.bind(this)}/>
          <ScoreTable
              scoreNotes={this.state.data}
              genderFilter={this.state.genderFilter}
              nameFilter={this.state.nameFilter}
              deleteScoreItem={this.onDelete.bind(this)}
              modifyItem={this.onModify.bind(this)}
          />
        </div>
      );
    }
  }
}

class ModifyScore extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      gender:'Male',
      maths:0,
      english:0,
      _id:0
    }
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps || !nextProps.val) return;
    this.setState({
      name: nextProps.val.name,
      gender: nextProps.val.gender,
      maths: nextProps.val.maths,
      english: nextProps.val.english,
      _id: nextProps.val._id
    });
    const tmpData = nextProps.val;
    this.refs.name.value = tmpData.name;
    this.refs.gender.value = tmpData.gender;
    this.refs.maths.value = tmpData.maths;
    this.refs.english.value = tmpData.english;
  }

  saveHandler(){
    if(this.state._id == 0){
      alert('Please select a Student to modify!');
      return;
    }
    this.props.save({
      name: this.refs.name.value,
      gender: this.refs.gender.value,
      maths: this.refs.maths.value,
      english: this.refs.english.value,
      _id: this.state._id
    });
  }

  render(){
    return(
      <div>
        <span>Name:</span>
        <input ref="name" defaultValue={this.state.name}/>
        <span>Gender: </span>
        <select ref="gender" defaultValue={this.state.gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <span>Maths: </span>
        <input ref="maths" defaultValue={this.state.maths}/>
        <span>English: </span>
        <input ref="english" defaultValue={this.state.english}/>
        <button onClick={this.saveHandler.bind(this)}>Save</button>
      </div>
    );
  }
}

class NameFilter extends React.Component{
  nameChangeHandler(name){
    this.props.onNameChange(this.refs.nameFilter.value);
  }

  render(){
    return(
      <div className="condition-item">
        <label>
        <span>Search by Name: </span>
        <input type="text" onChange={this.nameChangeHandler.bind(this)} value={this.props.nameFilter} ref="nameFilter"/>
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
      <span>Search by Gender: </span>
      <select onChange={this.genderChangeHandler.bind(this)} value={this.props.genderFilter} ref="genderFilter">
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
  deleteItemHandler(id){
    this.props.deleteScoreItem(id);
  }

  modifyItemHandler(id){
    this.props.modifyItem(id);
  }

  render(){
    const scoreNotes = [];
    const genderFilter =+ this.props.genderFilter,
          nameFilter = this.props.nameFilter,
          GENDER = ['','Male','Female'],
          _this = this;
          // console.log(this);
    $.each(this.props.scoreNotes, function(index, scoreItem){
      if(genderFilter !== 0 && nameFilter === ''){
        if(GENDER[genderFilter] == scoreItem.gender){
          !scoreItem.deleteFlag && scoreNotes.push(<ScoreItem key={scoreItem._id} score={scoreItem} onDelete={_this.deleteItemHandler.bind(_this)} onModify={_this.modifyItemHandler.bind(_this)}/>);
        }
        return;
      }

      if(genderFilter === 0 && nameFilter !== ''){
        if(scoreItem.name.indexOf(nameFilter) > -1){
          !scoreItem.deleteFlag && scoreNotes.push(<ScoreItem key={scoreItem._id} score={scoreItem} onDelete={_this.deleteItemHandler.bind(_this)} onModify={_this.modifyItemHandler.bind(_this)}/>);
        }
        return;
      }

      if(genderFilter !== 0 && nameFilter !== ''){
        if(GENDER[genderFilter] == scoreItem.gender && scoreItem.name.indexOf(nameFilter) > -1){
          !scoreItem.deleteFlag && scoreNotes.push(<ScoreItem key={scoreItem._id} score={scoreItem} onDelete={_this.deleteItemHandler.bind(_this)} onModify={_this.modifyItemHandler.bind(_this)}/>);
        }
      }
      if(genderFilter === 0 && nameFilter === ''){
        !scoreItem.deleteFlag && scoreNotes.push(<ScoreItem key={scoreItem._id} score={scoreItem} onDelete={_this.deleteItemHandler.bind(_this)} onModify={_this.modifyItemHandler.bind(_this)}/>);
      }
    });
    return(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Maths</th>
            <th>English</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {scoreNotes}
        </tbody>
      </table>
    );
  }
}

class ScoreItem extends React.Component{
  deleteHandler(e,id){
    this.props.onDelete(this.props.score._id);
  }

  modifyHandler(){
    this.props.onModify(this.props.score._id);
  }

  render(){
    const score = this.props.score;
    return(
      <tr>
        <td>{score.name}</td>
        <td>{score.gender}</td>
        <td>{score.maths}</td>
        <td>{score.english}</td>
        <td><span className="trigger" onClick={this.modifyHandler.bind(this)}>Modify</span><span className="trigger" onClick={this.deleteHandler.bind(this)}>Delete</span></td>
      </tr>
    );
  }
}

ReactDOM.render(<StudentScoreTable />, document.getElementById('content'));
