import { atom } from 'recoil';
import type { AddItemType } from '../selectedAddItemType';

export type ItemData = {
  key: string;
  itemType: Exclude<AddItemType, null>;
  x: number;
  y: number;
};

export const canvasItems = atom<ItemData[]>({
  key: 'Editor/cavasItems',
  default: []
});