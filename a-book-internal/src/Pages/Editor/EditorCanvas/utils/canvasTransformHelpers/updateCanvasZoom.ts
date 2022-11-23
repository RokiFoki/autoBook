import type { SetterOrUpdater } from 'recoil';
import minMaxBoundary from '../../../../../utils/calc/minMaxBoundary';

const updateCanvasZoom = (setCanvasZoom: SetterOrUpdater<number>, offset: number) => {
  setCanvasZoom((zoom) => {
    return minMaxBoundary(zoom + offset, 0.5, 2);
  });
}

export default updateCanvasZoom;