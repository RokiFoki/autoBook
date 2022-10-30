import { atom } from 'recoil';
import { ItemData } from './canvasItems';

export const selectedCanvasItems = atom<ItemData['id'][]>({
  key: 'Editor/selectedCanvasItems',
  default: []
});