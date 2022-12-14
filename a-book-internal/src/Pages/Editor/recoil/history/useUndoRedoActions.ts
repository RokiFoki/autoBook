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

export const constructUndoAction = (undoAction: UndoRedoAction['action'], redoAction: UndoRedoAction['oppositeAction']['action']) => {
  const undo: UndoRedoAction = {
    action: undoAction,
    oppositeAction: {
      action: redoAction,
      oppositeAction: null as unknown as UndoRedoAction
    }
  }
  undo.oppositeAction.oppositeAction = undo;

  return undo
}

export const useAddUndoAction = () => {
  const setUndoRedostate = useSetRecoilState(undoRedoState);

  return useEvent((undoAction: UndoRedoAction['action'], redoAction: UndoRedoAction['oppositeAction']['action']) => {
    undoActions.push(constructUndoAction(undoAction, redoAction));
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