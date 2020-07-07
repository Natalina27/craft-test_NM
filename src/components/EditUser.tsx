import React, {FC, useEffect, useState} from 'react';
import usersStore from '../models/UsersStore';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

// есть нотация для интерфейса IInterfaceName
interface IEditUserProps {
    firstNameInit: string;
    lastNameInit: string;
    ageInit: number;
}

export const EditUser: FC<IEditUserProps> = (props) => {
    const { userID } = useParams();

    const numberUserId = Number(userID);

    //const userId = +props.match.params.userID; //1 неявное приведение 2 лучше использовать готовый хук из react-router

    const [firstName, setFirstName] = useState(props.firstNameInit);  // очень странное решение о прямой передаче внешнего значения в initialValue
    const [lastName, setLastName] = useState(props.lastNameInit); // очень странное решение о прямой передаче внешнего значения в initialValue
    const [age, setAge] = useState(props.ageInit); // очень странное решение о прямой передаче внешнего значения в initialValue

    useEffect(() => {
        const updateUser = usersStore.usersState.find((el: any, index: number) => numberUserId=== index) //1 не гуд осуществлять доп операции непосредственно с action, лучше выносить такие вещи 2 any тоже не хорошо)
        setFirstName(updateUser.name.first); // посмотреть доку как правильно использовать setUpdater
        setLastName(updateUser.name.last);// посмотреть доку как правильно использовать setUpdater
        setAge(updateUser.age);// посмотреть доку как правильно использовать setUpdater
    }, []);

    const handleClick = () => {
        const updatedObj = {
            name: { first: firstName, last: lastName },
            age: age,
        };
        usersStore.updateUserItem(numberUserId, updatedObj); // посмотреть про runInAction
    }

    const handleChange = (e: any)  => {
        const inputName = e.target.name;
        if (inputName === "name_first") {
            setFirstName(e.target.value);
        }
        if (inputName === "name_last") {
            setLastName(e.target.value);
        }
        if (inputName === "age") {
            setAge(Number(e.target.value));
        }
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
                                    onChange={handleChange} // хех, а здесь не забыли, гуд!)
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
//export default EditUser;
