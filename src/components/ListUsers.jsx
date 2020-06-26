import React, {useState} from 'react';
import {observer} from 'mobx-react';
import usersStore from '../models/UsersStore';
import {Link} from 'react-router-dom';
import UserRowItem from './UserRowItem';
import Button from 'react-bootstrap/Button';

const ListUsers = observer(
    function ListUsers() {
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [age, setAge] = useState('');
        const [sortOrder, setSortOrder] = useState(1);
        const [users, setUsers] = useState(usersStore.usersState);

        // Здесь нужно реализовать функцию сортировки в таблице по заголовкам
        const handleSort = (e) => {
            const sorted = [].slice.call(users).sort((a, b) => {
                switch (e.target.id) {
                    case 'sort-index':
                        if (a.uid === b.uid) { return 0; }
                        return a.uid > b.uid ? sortOrder : sortOrder * -1;
                    case 'sort-first-name':
                        if (a.name.first === b.name.first) { return 0; }
                        return a.name.first > b.name.first ? sortOrder : sortOrder * -1;
                    case 'sort-last-name':
                        if (a.name.last === b.name.last) { return 0; }
                        return a.name.last > b.name.last ? sortOrder : sortOrder * -1;
                    case 'sort-age':
                        if (a.age === b.age) { return 0; }
                        return a.age > b.age ? sortOrder : sortOrder * -1;
                }
            });
            setSortOrder(sortOrder * -1);
            setUsers(sorted);
        }

        // Здесь нужно реализовать функцию фильтрации в таблице производя, используйте инпут

        const itemsList = users.slice().reduce((acc, value, index) => {
            const userIndex = usersStore.usersState.slice().findIndex((el) => {
                return (
                    el.name.first === value.name.first &&
                    el.name.last === value.name.last
                );
            });

            return userIndex === -1
                ? acc
                : [...acc, <UserRowItem
                    key={`userItem_${index}`}
                    value={value}
                    userID={userIndex}
                />]
        }, []);

        return (
            <div className="userListDiv">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>
                            <Button
                                variant="outline-dark"
                                id="sort-index"
                                onClick={handleSort}
                            >
                                #
                            </Button>
                        </th>
                        <th>
                            <Button
                                variant="outline-dark"
                                id="sort-first-name"
                                onClick={handleSort}
                            >
                                First Name
                            </Button>
                        </th>
                        <th>
                            <Button
                                variant="outline-dark"
                                id="sort-last-name"
                                onClick={handleSort}
                            >
                                Last Name
                            </Button>
                        </th>
                        <th>
                            <Button
                                variant="outline-dark"
                                id="sort-age"
                                onClick={handleSort}
                            >
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
                                value={firstName}
                                onChange={() => {
                                }}
                            />
                        </td>
                        <td key="nl_input">
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={() => {
                                }}
                            />
                        </td>
                        <td key="age_input">
                            <input
                                type="number"
                                min="1"
                                step="1"
                                name="age"
                                value={age}
                                onChange={() => {
                                }}
                            />
                        </td>
                        <td key="actoions_input">
                            <span/>
                            <span/>
                        </td>
                    </tr>
                    {itemsList}
                    </tbody>
                </table>
                <Link to="/create">
                    <Button variant="outline-dark">Создать</Button>
                </Link>
            </div>
        )
    },
);

export default ListUsers;