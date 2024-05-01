import { action, makeAutoObservable, makeObservable, observable } from "mobx";

class YMapPopup {
  isOpen = false;

  constructor() {
    makeAutoObservable(this)
  }

  setOpen = () => {
    this.isOpen = true;
  };

  setClose = () => {
    this.isOpen = false;
  };
}

export default new YMapPopup();