import matesStore from '../src/models/UsersStore.js';
import { observable, computed, action, autorun } from "mobx";

describe('Request', () => {
  it('set 1 init load testing ', (done) => {
    expect(matesStore.matesState.slice().length).toBe(15);
    done();
  });

  it('set 2 adding test item', (done) => {
    const testNewMateObj = { name: { first: 'set 2 test first name',
                                       last: 'set 2 test last name'},
                                age: '33' };
                                
    matesStore.addMateItem(testNewMateObj);
    expect(matesStore.matesState.slice().length).toBe(16);
    done();
  });

  it('set 3 deleting test items', (done) => {
    const itemID = 0;
    matesStore.delMateItem(itemID);
    matesStore.delMateItem(itemID);
    matesStore.delMateItem(itemID);
    expect(matesStore.matesState.slice().length).toBe(13);
    done();
  });

  it('set 4 updating test items', (done) => {
    const testFirstName = 'SomeJoeDoe';
    const testLastName = 'SomeJoeDoeLastName';
    const testAge = 33;

    const testNewMateObj = {
      'name': {
        'first': testFirstName,
        'last': testLastName
      },
      'age': testAge
    }

    const testUpdateMateObj = {
      'name': {
        'first': testFirstName + '_blah',
        'last': testLastName + '_doh'
      },
      'age': (testAge+1)
    }

    matesStore.addMateItem(testNewMateObj);
    const newObjID = (matesStore.matesState.slice().length-1);
    const newSpawnedObj = matesStore.matesState.slice()[newObjID];

    expect(newSpawnedObj.name.first).toBe(testFirstName);
    expect(newSpawnedObj.name.last).toBe(testLastName);
    expect(newSpawnedObj.age).toBe(testAge);

    matesStore.updateMateItem(newObjID, testUpdateMateObj);
    const updatedObj = matesStore.matesState.slice()[newObjID];

    expect(updatedObj.name.first).toBe(testUpdateMateObj.name.first);
    expect(updatedObj.name.last).toBe(testUpdateMateObj.name.last);
    expect(updatedObj.age).toBe(testUpdateMateObj.age);

    done();
  });


});
