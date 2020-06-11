import React from "react";
import usersStore from '../models/UsersStore';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { name_first : '',
                   name_last : '',
                   age: 0 };
  }

  handleClick(e) {
    const newObj = { name: {first: this.state.name_first,
                            last: this.state.name_last},
                     age: this.state.age };
    usersStore.addUserItem(newObj);
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render () {

  return (
      <div className='createuser row'>
        <div className="col-md-6 col-sm-12 col-lg-6 col-md-offset-3">
          <div className="panel panel-default">
            <div className="panel-body">
              <form name="myform">
                <div className="form-group">
                  <label htmlFor="myName">First Name *</label>
                  <input
                    id="name_first"
                    name="name_first"
                    className="form-control"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.name_first}
                  data-validation="required"/>
                  <span id="error_name" className="text-danger"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name *</label>
                  <input
                    id="name_last"
                    name="name_last"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.name_last}
                    type="text"
                  data-validation="email"/>
                  <span id="error_lastname" className="text-danger"></span>
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age *</label>
                  <input
                    id="age"
                    name="age"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.age}
                    type="number"
                  min="1" />
                  <span id="error_age" className="text-danger"></span>
                </div>
                <Link to="/">
                <Button variant="outline-success" id="submit" onClick={this.handleClick}>Создать</Button>
              </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default CreateUser;
