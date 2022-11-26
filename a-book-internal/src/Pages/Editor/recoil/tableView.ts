import { atom } from 'recoil';

const tableView = atom({
  key: "Editor/TableView",
  default: false
});

export default tableView;