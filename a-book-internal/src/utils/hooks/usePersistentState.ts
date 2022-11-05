import { useState } from 'react';
import useEvent from './useEvent';

const localStoragePath = 'persistentState/';

const usePersistentState = <T extends object | number>(defaultState: T, uniqueKey: string) => {
    const getInitialState = () => {
        const item = localStorage.getItem(localStoragePath + uniqueKey);

        const initialState = item == null ? defaultState : JSON.parse(item);

        return initialState;
    }
    const [state, _setState] = useState<T>(getInitialState);

    const setState: React.Dispatch<React.SetStateAction<T>> = useEvent((valueOrFun) => {
        if (typeof valueOrFun === 'function') {
            _setState((value) => {
                const newValue = valueOrFun(value);

                return newValue;
            })
        } else {
            const value = valueOrFun;

            localStorage.setItem(localStoragePath + uniqueKey, JSON.stringify(value));
            _setState(value);
        }
    })

    return [state, setState] as const;
}

export default usePersistentState;