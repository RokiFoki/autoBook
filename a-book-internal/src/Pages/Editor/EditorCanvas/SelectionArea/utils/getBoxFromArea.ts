import type { Area } from '../useEditorSelectedArea';

const getBoxFromArea = (area: Area) => {
  const left = Math.min(area.startX, area.endX);
  const top = Math.min(area.startY, area.endY);
  const width = Math.abs(area.endX - area.startX);
  const height = Math.abs(area.endY - area.startY);
  return { top, left, width, height };
}

export default getBoxFromArea