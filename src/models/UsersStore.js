import { action, extendObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import usersDB from '../users.json';

class ObservableUsersStore {
    constructor() {
        extendObservable(this, {
            users: [],
            get usersState() {
                return this.users;
            },
        });
    }

    saveLocal() {
        const lst = typeof localStorage === 'undefined' ? {} : localStorage;

        lst.users = JSON.stringify(this.usersState);
    }

    // Пример функции добавления
    addUserItem = action('addUserItem', function(userItem) {
        const guid = uuidv4();

        this.users.push({ ...userItem, ...{ guid } });
        this.saveLocal();
    });

    // Добавить функцию удаления
    deleteUserItem = action('deleteUserItem', function(id) {
        const filteredUsers = this.users.filter((el, index) => index !== id);
        this.users.replace(filteredUsers);
        this.saveLocal();
    });

    // Добавить функцию редактирования
    updateUserItem = action('updateUserItem', function (id, userItem) {
        const updatedUsers = this.users.map((el, index) => {
            if(index === id){
                el.name.first = userItem.name.first;
                el.name.last = userItem.name.last;
                el.age = userItem.age;
            }
            return el;
        })
        this.users.replace(updatedUsers);
        this.saveLocal();
    })
}

const insertData = store => {
    const lst = typeof localStorage === 'undefined' ? {} : localStorage;

    if (!!lst.users && JSON.parse(lst.users).length > 0) {
        JSON.parse(lst.users).forEach(e => store.addUserItem(e));
    } else {
        usersDB.forEach(e => store.addUserItem(e));
    }

    return store;
};

const usersStore = insertData(new ObservableUsersStore());

export default usersStore;
