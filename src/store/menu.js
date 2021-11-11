import { makeAutoObservable } from 'mobx';


class Menu {
    selectedKeys = [];

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedKeys(keys) {
        this.selectedKeys = keys;
    }
}

const menu = new Menu();


export default menu;