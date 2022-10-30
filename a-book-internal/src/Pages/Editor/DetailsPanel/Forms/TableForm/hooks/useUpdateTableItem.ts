import { useRecoilState } from 'recoil';
import useEvent from '../../../../../../utils/hooks/useEvent';
import { canvasItems, ItemData } from '../../../../recoil/canvas/canvasItems';

const useUpdateTable = () => {
  const [_, setCanvasItems] = useRecoilState(canvasItems);

  return useEvent((newItem: ItemData) => {
    setCanvasItems((items) => items.map(item => item.id === newItem.id ? newItem : item))
  })
}

export default useUpdateTable;
