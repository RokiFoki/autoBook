import { atom } from 'recoil';
import type { AddItemType } from '../selectedAddItemType';

export type ItemData = {
  id: number;
  name: string;
  itemType: Exclude<AddItemType, null>;
  x: number;
  y: number;
  rotation: number;
};

export const canvasItems = atom<ItemData[]>({
  key: 'Editor/cavasItems',
  default: []
});