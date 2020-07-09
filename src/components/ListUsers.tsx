import React, {useState, useReducer, ChangeEvent} from 'react';
import {observer} from 'mobx-react';
import usersStore from '../models/UsersStore';
import {Link} from 'react-router-dom';
import UserRowItem from './UserRowItem';
import Button from 'react-bootstrap/Button';
import { reduceUsers } from '../mobx/reducer';

// есть нотация для интерфейса IInterfaceName
interface IListUsersProps {
    sortOrderInit: number;
    users: Array<object>;
}


export const ListUsers = observer(

    function ListUsers (FC:IListUsersProps , {
        //Прочитать про defaultProps
        sortOrderInit = 1,
        users = usersStore.usersState
    }){
        // лучше юзать useReducer
        const [sortOrder, setSortOrder] = useState(sortOrderInit);
        const [filteredList, dispatch] = useReducer(reduceUsers, users);

        // Здесь нужно реализовать функцию сортировки в таблице по заголовкам
        const handleSort = (e: any): void => { // точно не any (не срабатывает свойство .id and .name при Mouse events onClick)
            dispatch({type: e.target.name, payload:{value: '', sortOrder: sortOrder}});
            setSortOrder(sortOrder * -1);
        }

        // Здесь нужно реализовать функцию фильтрации в таблице производя, используйте инпут
        const handleFilter = (e: ChangeEvent<HTMLInputElement>): void => {
            dispatch({type: e.target.name, payload:{value: e.target.value, sortOrder: sortOrder}});
        }
        const itemsList = [...filteredList].reduce((acc, value, index) => {
            const userIndex = [...users].findIndex((el) => el.guid === value.guid);
            return userIndex === -1
                ? acc
                : acc.concat([
                    <UserRowItem
                        key={`userItem_${index}`}
                        value={value}
                        userID={userIndex}
                    />
                ])
        }, []);

        return (
            <div className="userListDiv">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>
                            <Button
                                variant="outline-dark"
                                name="sort-index"
                                onClick={handleSort}
                            >
                                #
                            </Button>
                        </th>
                        <th>
                            <Button
                                variant="outline-dark"
                                name="sort-first-name"
                                onClick={handleSort}
                            >
                                First Name
                            </Button>
                        </th>
                        <th>
                            <Button
                                variant="outline-dark"
                                name="sort-last-name"
                                onClick={handleSort}
                            >
                                Last Name
                            </Button>
                        </th>
                        <th>
                            <Button
                                variant="outline-dark"
                                name="sort-age"
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
                                // value={firstName}
                                onChange={handleFilter}
                            />
                        </td>
                        <td key="nl_input">
                            <input
                                type="text"
                                name="lastName"
                                // value={lastName}
                                onChange={handleFilter}
                            />
                        </td>
                        <td key="age_input">
                            <input
                                type="number"
                                min="1"
                                step="1"
                                name="age"
                                // value={age}
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
