import { atom, selector } from 'recoil';
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

export const canvasItemsMap = selector({
  key: 'Editor/canvasItemsMap',
  get: ({ get }) => {
    const items = get(canvasItems);

    return items.reduce((a, c) => {
      a[c.id] = c;
      return a;
    }, {} as Record<ItemData['id'], ItemData>)

  }
})