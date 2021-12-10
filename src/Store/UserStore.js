import AsyncStorage from '@react-native-community/async-storage';
import {action, makeObservable, observable, runInAction} from 'mobx';
import {USER_KEY} from '../Constant/AsyncStorage';

class Store {
  user = {};

  constructor() {
    makeObservable(this, {
      user: observable,
      loadUser: action,
      updateUser: action,
      clearUser: action,
    });
  }
  loadUser = async () => {
    const user = await AsyncStorage.getItem(USER_KEY);
    runInAction(() => {
      this.user = JSON.parse(user);
    });
  };

  updateUser = async data => {
    try {
      AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
    } catch (error) {
      console.log('error async storage', error);
    }
    runInAction(() => {
      this.user = data;
    });
  };

  clearUser = async () => {
    await AsyncStorage.removeItem('user_data');
    await AsyncStorage.clear();
    runInAction(() => {
      this.user = {};
    });
  };
}

export const UserStore = new Store();
