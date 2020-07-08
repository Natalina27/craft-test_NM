import React, { FC, useReducer, ChangeEvent } from 'react';
import usersStore from '../models/UsersStore';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

// есть нотация для интерфейса IInterfaceName
interface ICreateUserProps {
    firstNameInitial: string;
    lastNameInitial: string;
    ageInitial: string;
}

const reducer = (state: string, action: string): string =>  action;

export const CreateUser: FC<ICreateUserProps> =
    ({  //Прочитать про defaultProps
         firstNameInitial = '',
         lastNameInitial= '',
         ageInitial = '0',
     }) => {
        // лучше юзать useReducer
        const [firstName, changeFirstName] = useReducer(reducer, firstNameInitial);
        const [lastName, changeLastName] = useReducer(reducer, lastNameInitial);
        const [age, changeAge] = useReducer(reducer, ageInitial);

        const handleClick = () => {
            const newObj = {
                name: {first: firstName, last: lastName},
                age: Number(age),
            };
            usersStore.addUserItem(newObj);
        }

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const field = event.target.name;
            const value = event.target.value;
            field === 'name_first' && changeFirstName(value);
            field === 'name_last' && changeLastName(value);
            field === 'age' && changeAge(value);
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
                                        value={firstName}
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
                                        value={lastName}
                                        type="text"
                                        data-validation="required" //тут просто опечатка походу)
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
                                        onChange={handleChange} // не очень хороший пример приведения лучше использовать Number()
                                        value={age}
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
                                        Создать
                                    </Button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
// узнать о проблемах дефолтного экспорта
//export default CreateUser;
