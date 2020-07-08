import React, {useState, useReducer} from 'react';
import {observer} from 'mobx-react';
import usersStore from '../models/UsersStore';
import {Link} from 'react-router-dom';
import UserRowItem from './UserRowItem';
import Button from 'react-bootstrap/Button';

// есть нотация для интерфейса IInterfaceName
interface IListUsersProps {
    firstNameInit: string;
    lastNameInit: string;
    ageInit: string;
    sortOrderInit: number;
    users: Array<object>;
}

const reducer = (state: string, action: string): string =>  action;


export const ListUsers = observer(

    function ListUsers (FC:IListUsersProps , {
        //Прочитать про defaultProps
        firstNameInit = '',
        lastNameInit = '',
        ageInit = '',
        sortOrderInit = 1,
        users = usersStore.usersState
    }){
        // лучше юзать useReducer
        const [firstName, setFirstName] = useReducer(reducer, firstNameInit);
        const [lastName, setLastName] = useReducer(reducer,lastNameInit);
        const [age, setAge] = useReducer(reducer,ageInit);
        const [sortOrder, setSortOrder] = useState(sortOrderInit);
        //const users = usersStore.usersState;
        const [filteredList, setFilteredList] = useState(users); //?

        // Здесь нужно реализовать функцию сортировки в таблице по заголовкам
        const handleSort = (e: any) => { // точно не any
            const sorted = [...filteredList].sort((a:any, b:any): any => {

                switch (e.target.id) {
                    case 'sort-index':
                        const aIdx = [...users].findIndex(el => el.guid === a.guid);
                        const bIdx = [...users].findIndex(el => el.guid === b.guid);
                        if (aIdx === bIdx) { return 0; }
                        return aIdx > bIdx ? sortOrder : sortOrder * -1;
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
            // немного переусложнен код, можно чуть проще, но все в целом ок
            setSortOrder(sortOrder * -1);
            setFilteredList(sorted);
        }

        // Здесь нужно реализовать функцию фильтрации в таблице производя, используйте инпут
        const handleFilter = (e: any) => { // точно не any

            const value = e.target.value; // смотрится очень странно
            const field = e.target.name; // смотрится очень странно

            if(field === 'firstName') setFirstName(value);
            if(field === 'lastName') setLastName(value);
            if(field === 'age') setAge(value);

            const filter = users.filter((user: any) => { // точно не any
                switch (field) {
                    case 'firstName':
                        return user.name.first.toLowerCase().includes(value.toLowerCase());
                    case 'lastName':
                        return user.name.last.toLowerCase().includes(value.toLowerCase());
                    case 'age':
                        return user.age.toString().includes(value.toString());
                    default:
                        return user;
                }
            });
            // тоже усложнен контракт, пока пойдет
            setFilteredList(filter);
        }


        const itemsList = [...filteredList].reduce((acc, value, index) => {
            const userIndex = [...users].findIndex((el) => {
                return (
                    el.name.first === value.name.first &&
                    el.name.last === value.name.last
                );
            });

            return userIndex === -1
                ? acc
                : acc.concat( [<UserRowItem
                    key={`userItem_${index}`}
                    value={value}
                    userID={userIndex}
                />])
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
                                onChange={handleFilter}
                            />
                        </td>
                        <td key="nl_input">
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={handleFilter}
                            />
                        </td>
                        <td key="age_input">
                            <input
                                type="number"
                                min="1"
                                step="1"
                                name="age"
                                value={age}
                                onChange={handleFilter}
                            />
                        </td>
                        <td key="actions_input">
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
// узнать о проблемах дефолтного экспорта
//export default ListUsers;
