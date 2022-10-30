import { atom } from 'recoil';
import { ItemData } from './canvasItems';

export const selectedCanvasItems = atom<ItemData['key'][]>({
  key: 'Editor/selectedCanvasItems',
  default: []
});