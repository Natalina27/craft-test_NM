import usersStore from "../models/UsersStore";


export const reduceUsers = (state: any, action: {type: string; payload: {value: string; sortOrder: number};}) => {
    switch (action.type) {
        case 'firstName':
            return usersStore.usersState.filter((user: { name: { first: string; last: string; }; age: number }) => {
                return user.name.first.toLowerCase().includes(action.payload.value.toLowerCase());
            });
        case 'lastName':
            return usersStore.usersState.filter((user: { name: { first: string; last: string; }; age: number }) => {
                return user.name.last.toLowerCase().includes(action.payload.value.toLowerCase());
            });
        case 'age':
            return usersStore.usersState.filter((user: { name: { first: string; last: string; }; age: number }) => {
                return user.age.toString().includes(action.payload.value.toString());
            });
        case 'sort-index':
            return state.sort( (a: { guid: string; name: { first: string; last: string; }; age: number; }, b: { guid: string; name: { first: string; last: string; }; age: number; }) => {
                const aIdx = usersStore.usersState.findIndex((el: { guid: string; }) => el.guid === a.guid);
                const bIdx = usersStore.usersState.findIndex((el: { guid: string; }) => el.guid === b.guid);
                if (aIdx === bIdx) {
                    return 0;
                }
                return aIdx > bIdx ? action.payload.sortOrder : action.payload.sortOrder * -1;
            });
        case 'sort-first-name':
            return state.sort( (a: { guid: string; name: { first: string; last: string; }; age: number; }, b: { guid: string; name: { first: string; last: string; }; age: number; }) => {
                if (a.name.first === b.name.first) {
                    return 0;
                }
                return a.name.first > b.name.first ? action.payload.sortOrder : action.payload.sortOrder * -1;
            });
        case 'sort-last-name':
            return state.sort( (a: { guid: string; name: { first: string; last: string; }; age: number; }, b: { guid: string; name: { first: string; last: string; }; age: number; }) => {
                if (a.name.last === b.name.last) {
                    return 0;
                }
                return a.name.last > b.name.last ? action.payload.sortOrder : action.payload.sortOrder * -1;
            });
        case 'sort-age':
            return state.sort( (a: { guid: string; name: { first: string; last: string; }; age: number; }, b: { guid: string; name: { first: string; last: string; }; age: number; }) => {
                if (a.age === b.age) {
                    return 0;
                }
                return a.age > b.age ? action.payload.sortOrder : action.payload.sortOrder * -1;
            });
        default:
            return state;
    }
}
