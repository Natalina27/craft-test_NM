import React, {FC, useEffect, useState} from 'react';
import usersStore from '../models/UsersStore';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

interface EditUserProps {
    firstNameInit: string;
    lastNameInit: string;
    ageInit: number;
    match: any;
    params: any;
    userID: string;
}

const EditUser: FC<EditUserProps> = (props) => {

    const userId = +props.match.params.userID;

    const [firstName, setFirstName] = useState(props.firstNameInit);
    const [lastName, setLastName] = useState(props.lastNameInit);
    const [age, setAge] = useState(props.ageInit);

    useEffect(() => {
        const updateUser = usersStore.usersState.find((el: any, index: number) => userId === index)
        setFirstName(updateUser.name.first);
        setLastName(updateUser.name.last);
        setAge(updateUser.age);
    }, []);

    const handleClick = () => {
        const updatedObj = {
            name: { first: firstName, last: lastName },
            age: age,
        };
        usersStore.updateUserItem(userId, updatedObj);
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
                                    className="form-control"
                                    type="text"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName || ''}
                                    data-validation="required"
                                />
                                <span id="error_name" className="text-danger"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Last Name *</label>
                                <input
                                    className="form-control"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName || ''}
                                    type="text"
                                    data-validation="email"
                                />
                                <span
                                    id="error_lastname"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Age *</label>
                                <input
                                    className="form-control"
                                    onChange={(e) => setAge(Number(e.target.value))}
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

export default EditUser;
