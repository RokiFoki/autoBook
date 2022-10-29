import { atom } from 'recoil';
import type { TableType } from '../Elements/Tables/Table';

export type AddItemType = null | TableType;
export const selectedAddItem = atom<AddItemType>({
  key: 'Editor/selectedAddItem',
  default: null
});