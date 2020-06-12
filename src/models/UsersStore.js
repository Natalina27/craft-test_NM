import { action, extendObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import usersDB from '../users.json';

class ObservableUsersStore {
  constructor () {
    extendObservable(this, {
      'users' : [],
      get usersState() { return this.users; }
    })
  }

  saveLocal() {
    let lst = (typeof localStorage === 'undefined') ? {} : localStorage;

    lst['users']=JSON.stringify(this.usersState);
  }
  // Пример функции добавления
  addUserItem = action("addUserItem", function(userItem) {
    const guid = uuidv4();
    this.users.push({...userItem, ...{ guid: guid } });
    this.saveLocal();
  });
  // Добавить функцию удаления

 // Добавить функцию редактирования

}

const insertData = (store) => {
  let lst = (typeof localStorage === 'undefined') ? {} : localStorage;

  if(!!lst['users'] && JSON.parse(lst['users']).length >0) {
    JSON.parse(lst['users']).forEach( e => store.addUserItem(e));
  } else {
    usersDB.forEach( e => store.addUserItem(e) );
  }
  return store;
}

const usersStore = insertData(new ObservableUsersStore());

export default usersStore;
