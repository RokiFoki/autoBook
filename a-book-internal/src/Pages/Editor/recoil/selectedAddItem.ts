import { atom } from 'recoil';
import type { TableType } from '../Elements/Tables/Table';

export type AddItem = null | TableType;
export const selectedAddItem = atom<AddItem>({
  key: 'Editor/selectedAddItem',
  default: null
});