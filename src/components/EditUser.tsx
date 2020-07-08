import React, { useState, ChangeEvent } from 'react';
import usersStore from '../models/UsersStore';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import {runInAction} from "mobx";


export const EditUser = () => {
    const {userID}: any = useParams();
    const userId: number = Number(userID);

    const user = usersStore.usersState.find((el: object, index: number) => userId === index);

    const [firstName, setFirstName] = useState(user.name.first);
    const [lastName, setLastName] = useState(user.name.last);
    const [age, setAge] = useState(user.age);

    const handleClick = () => {
        const users = usersStore.usersState;
        const updatedUser: object = {...user, name: { first: firstName, last: lastName}, age: age};
        // usersStore.updateUserItem(userId, updatedUser); // посмотреть про runInAction
        runInAction(() => {
            const updatedUsers = users.map((el: object, index: number) => {
                if(index === userId){
                    return updatedUser;
                }
                return el;
            })
            users.replace(updatedUsers);
            usersStore.saveLocal()
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.name === 'name_first' && setFirstName(e.target.value);
        e.target.name === 'name_last' && setLastName(e.target.value);
        e.target.name === 'age' && setAge(e.target.value);
    }

    return (
        <div className="createuser row">
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
                                    onChange={handleChange} // лучше такие вещи выносить в хендлер
                                    value={firstName || ''}
                                    data-validation="required"
                                />
                                <span id="error_name" className="text-danger"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Last Name *</label>
                                <input
                                    id="name_last"
                                    name="name_last"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={lastName || ''}
                                    type="text"
                                    data-validation="required"
                                />
                                <span
                                    id="error_lastname"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Age *</label>
                                <input
                                    id="age"
                                    name="age"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={age || 0}
                                    type="number"
                                    min="1"
                                />
                                <span id="error_age" className="text-danger"/>
                            </div>
                            <Link to="/">
                                <Button
                                    variant="outline-success"
                                    id="submit"
                                    onClick={handleClick}
                                >
                                    Обновить
                                </Button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

