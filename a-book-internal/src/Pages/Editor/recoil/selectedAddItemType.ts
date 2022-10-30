import { atom } from 'recoil';
import type { TableType } from '../Elements/Tables/Table';

export type AddItemType = null | TableType;
export const selectedAddItemType = atom<AddItemType>({
  key: 'Editor/selectedAddItemType',
  default: null
});