import React, {FC, useEffect, useState} from 'react';
import usersStore from '../models/UsersStore';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

// есть нотация для интерфейса IInterfaceName
interface EditUserProps {
    firstNameInit: string;
    lastNameInit: string;
    ageInit: number;
    match: any;
    params: any;
    userID: string;
}

const EditUser: FC<EditUserProps> = (props) => {

    const userId = +props.match.params.userID; //1 неявное приведение 2 лучше использовать готовый хук из react-router

    const [firstName, setFirstName] = useState(props.firstNameInit);  // очень странное решение о прямой передаче внешнего значения в initialValue
    const [lastName, setLastName] = useState(props.lastNameInit); // очень странное решение о прямой передаче внешнего значения в initialValue
    const [age, setAge] = useState(props.ageInit); // очень странное решение о прямой передаче внешнего значения в initialValue

    useEffect(() => {
        const updateUser = usersStore.usersState.find((el: any, index: number) => userId === index) //1 не гуд осуществлять доп операции непосредственно с action, лучше выносить такие вещи 2 any тоже не хорошо)
        setFirstName(updateUser.name.first); // посмотреть доку как правильно использовать setUpdater
        setLastName(updateUser.name.last);// посмотреть доку как правильно использовать setUpdater
        setAge(updateUser.age);// посмотреть доку как правильно использовать setUpdater
    }, []);

    const handleClick = () => {
        const updatedObj = {
            name: { first: firstName, last: lastName },
            age: age,
        };
        usersStore.updateUserItem(userId, updatedObj); // посмотреть про runInAction
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
                                    onChange={(e) => setFirstName(e.target.value)} // лучше такие вещи выносить в хендлер
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
                                    onChange={(e) => setAge(Number(e.target.value))} // хех, а здесь не забыли, гуд!)
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
// узнать о проблемах дефолтного экспорта
export default EditUser;
