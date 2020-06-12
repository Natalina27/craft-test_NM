import React from 'react';
import { observer } from 'mobx-react';
import usersStore from '../models/UsersStore';
import { Link } from 'react-router-dom';
import UserRowItem from './UserRowItem';
import Button from 'react-bootstrap/Button';

const ListUsers = observer(
    class ListUsers extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                firstName: '',
                lastName: '',
                age: '',
                sortOrder: 1,
                users: usersStore.usersState,
            };
        }

        // Здесь нужно реализовать функцию сортировки в таблице по заголовкам
        // Здесь нужно реализовать функцию фильтрации в таблице производя, используйте инпут

        render() {
            const itemsList = this.state.users.slice().reduce((acc, value, index) => {
                const userIndex = usersStore.usersState.slice().findIndex((el, index) => {
                    return (
                        el.name.first === value.name.first &&
                        el.name.last === value.name.last
                    );
                });

                return userIndex === -1
                    ? acc
                    : acc.concat([
                          <UserRowItem
                              key={`userItem_${index}`}
                              value={value}
                              userID={userIndex}
                          />,
                      ]);
            }, []);

            return (
                <div className="userListDiv">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    <Button variant="outline-dark" id="sort-index">
                                        #
                                    </Button>
                                </th>
                                <th>
                                    <Button variant="outline-dark" id="sort-first-name">
                                        First Name
                                    </Button>
                                </th>
                                <th>
                                    <Button variant="outline-dark" id="sort-last-name">
                                        Last Name
                                    </Button>
                                </th>
                                <th>
                                    <Button variant="outline-dark" id="sort-age">
                                        Age
                                    </Button>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key="tr_filter">
                                <td key="id_filter">-</td>
                                <td key="nf_input">
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={this.state.firstName}
                                        onChange={() => {}}
                                    ></input>
                                </td>
                                <td key="nl_input">
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={this.state.lastName}
                                        onChange={() => {}}
                                    ></input>
                                </td>
                                <td key="age_input">
                                    <input
                                        type="number"
                                        min="1"
                                        step="1"
                                        name="age"
                                        value={this.state.age}
                                        onChange={() => {}}
                                    ></input>
                                </td>
                                <td key="actoions_input">
                                    <span></span>
                                    <span></span>
                                </td>
                            </tr>
                            {itemsList}
                        </tbody>
                    </table>
                    <Link to="/create">
                        <Button variant="outline-dark">Создать</Button>
                    </Link>
                </div>
            );
        }
    },
);

export default ListUsers;
