import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useEvent from '../../../../utils/hooks/useEvent';

const undoRedoState = atom({
  key: 'Editor/undoRedoState',
  default: 0
});

export type UndoRedoAction = {
  action: () => unknown;
  oppositeAction: UndoRedoAction;
}

let undoActions: (UndoRedoAction)[] = [];
let redoActions: (UndoRedoAction)[] = [];

export const useAddUndoAction = () => {
  const setUndoRedostate = useSetRecoilState(undoRedoState);

  return useEvent((action: UndoRedoAction) => {
    undoActions.push(action);
    setUndoRedostate(val => val + 1);
  })
}

export const useResetRedo = () => {
  const setUndoRedostate = useSetRecoilState(undoRedoState);

  return useEvent(() => {
    redoActions = [];
    setUndoRedostate(val => val + 1);
  })
}

const useUndoRedoActions = () => {
  // _state is here to trigger rerender
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, setState] = useRecoilState(undoRedoState);


  return {
    undo: {
      enabled: undoActions.length > 0,
      action: useEvent(() => {
        const action = undoActions.pop();

        if (action) {
          action.action();
          redoActions.push(action.oppositeAction);
        }
        setState(val => val + 1);
      })
    },
    redo: {
      enabled: redoActions.length > 0,
      action: useEvent(() => {
        const action = redoActions.pop();

        if (action) {
          action.action();
          undoActions.push(action.oppositeAction);
        }
        setState(val => val + 1);
      })
    }
  }
}

export default useUndoRedoActions;