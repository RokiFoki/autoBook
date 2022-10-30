import { selector } from 'recoil';
import { canvasItems as _canvasItems } from '../../recoil/canvas/canvasItems';
import { selectedCanvasItems } from '../../recoil/canvas/selectedCanvasItems';

const getDetailsData = selector({
  key: 'DetailsPanel/getDetailsData',
  get: ({ get }) => {
    const selectedItems = get(selectedCanvasItems);
    const canvasItems = get(_canvasItems);

    if (selectedItems.length === 1) {
      return canvasItems.find(item => item.id === selectedItems[0])
    }
  }
})

export default getDetailsData;