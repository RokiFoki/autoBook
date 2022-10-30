import { atom } from 'recoil';

export type Operation = null | 'Add' | 'Select'
export const operationInProgress = atom<Operation>({
    key: 'Editor/actionInProgress',
    default: null,
});