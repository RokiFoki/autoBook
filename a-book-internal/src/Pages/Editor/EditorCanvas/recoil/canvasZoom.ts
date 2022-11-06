import { atom } from 'recoil';

const canvasZoom = atom({
  key: 'EditorCanvas/zoom',
  default: 1
})

export default canvasZoom;