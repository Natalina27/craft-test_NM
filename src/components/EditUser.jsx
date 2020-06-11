import React from "react";
import { observer } from "mobx-react";
import usersStore from '../models/UsersStore';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const EditUser = observer (class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.userID = parseInt(props.match.params.userID, 10);
    this.users = usersStore.usersState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    let newObj = { 'name': {
                      'first': this.users[this.userID].name.first,
                      'last': this.users[this.userID].name.last
                    },
                  'age':this.users[this.userID].age
                };

    switch(name) {
      case 'first_name' :
        newObj.name.first = value;
      break;
      case 'last_name' :;
        newObj.name.last = value;
      break;
      case 'age' :
          newObj.age = value;
      break;
      default:
      break;
    }
    newObj =  { ...this.users[this.userID], ...newObj };
    usersStore.updateUserItem(this.userID, newObj);
  }

  render ()  {
    return (
      <div className='createuser row'>
        <div className="col-md-6 col-sm-12 col-lg-6 col-md-offset-3">
          <div className="panel panel-default">
            <div className="panel-body">
              <form name="myform">
                <div className="form-group">
                  <label htmlFor="myName">First Name *</label>
                  <input id="myName" name="first_name" value={this.users[this.userID].name.first} onChange={this.handleChange} className="form-control" type="text" />
                  <span id="error_name" className="text-danger"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name *</label>
                  <input id="lastname" name="last_name" value={this.users[this.userID].name.last} onChange={this.handleChange} className="form-control" type="text" />
                  <span id="error_lastname" className="text-danger"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age *</label>
                  <input id="age" name="age"  value={this.users[this.userID].age} onChange={this.handleChange} className="form-control" type="number" min="1" />
                  <span id="error_age" className="text-danger"></span>
                </div>
                <Link to='/'><Button variant="outline-success">Обновить</Button></Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  };
}
);

export default EditUser;
