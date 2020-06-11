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

  addUserItem = action("addUserItem", function(userItem) {
    const guid = uuidv4();
    this.users.push({...userItem, ...{ guid: guid } });
    this.saveLocal();
  });

  delUserItem = action ("delUserItem", function (id) {
    this.users.remove(this.users[id]);
    this.saveLocal();;
  });

  updateUserItem = action( "updateUserItem", function (itemId, itemObj) {
    this.users[parseInt(itemId,10)] = itemObj;
    this.saveLocal();
  });
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
